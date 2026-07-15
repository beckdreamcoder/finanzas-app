<#
.SYNOPSIS
    Script de Respaldo de Base de Datos - FinanceTracker (Producción - Aiven)
.DESCRIPTION
    Genera un respaldo (.sql) de la base de datos de producción alojada en
    Aiven Cloud (MySQL 8.4) conectándose de forma remota con SSL.
    El archivo se guarda en db/backups/ con timestamp automático.
#>

param(
    [string]$DbHost = "mysql-14aa6667-janitojahuarc-ec57.c.aivencloud.com",
    [int]$DbPort = 26994,
    [string]$DbUser = "avnadmin",
    [string]$DbPassword = $(if ($env:AIVEN_PASSWORD) { $env:AIVEN_PASSWORD } elseif ($env:DB_PASSWORD) { $env:DB_PASSWORD } else { "" }),
    [string]$DbName = "defaultdb",
    [string]$BackupDir = "$PSScriptRoot\..\..\db\backups"
)

if (!$DbPassword) {
    Write-Host "[ERROR] Contraseña de base de datos no proporcionada." -ForegroundColor Red
    Write-Host "Define la variable de entorno AIVEN_PASSWORD (o DB_PASSWORD) o pasa -DbPassword al ejecutar." -ForegroundColor Yellow
    exit 1
}

if (!(Test-Path -Path $BackupDir)) {
    New-Item -ItemType Directory -Path $BackupDir -Force | Out-Null
}

# Buscar mysqldump en rutas conocidas de MySQL Server / Workbench / PATH
$mysqldumpPath = $null
$rutasComunes = @(
    "C:\Program Files\MySQL\MySQL Server 9.6\bin\mysqldump.exe",
    "C:\Program Files\MySQL\MySQL Server 9.5\bin\mysqldump.exe",
    "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqldump.exe",
    "C:\Program Files\MySQL\MySQL Workbench 8.0 CE\mysqldump.exe"
)

foreach ($ruta in $rutasComunes) {
    if (Test-Path $ruta) {
        $mysqldumpPath = $ruta
        break
    }
}

if ($null -eq $mysqldumpPath) {
    $mysqldumpPath = "mysqldump"
}

$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$backupFile = Join-Path $BackupDir "${DbName}_backup_${timestamp}.sql"

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host " Operacion TI - Respaldo de Base de Datos de PRODUCCION" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host " Servidor : $DbHost`:$DbPort (Aiven Cloud)" -ForegroundColor Gray
Write-Host " Base datos: $DbName" -ForegroundColor Gray
Write-Host " Usuario   : $DbUser" -ForegroundColor Gray
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "[1/2] Ejecutando respaldo remoto usando: $mysqldumpPath" -ForegroundColor Yellow

& $mysqldumpPath -h $DbHost -P $DbPort -u $DbUser -p"$DbPassword" $DbName --ssl-mode=REQUIRED --column-statistics=0 --default-character-set=utf8mb4 --routines --triggers --set-gtid-purged=OFF --result-file="$backupFile" 2>$null

if ($LASTEXITCODE -eq 0 -and (Test-Path $backupFile) -and (Get-Item $backupFile).Length -gt 0) {
    $fileInfo = Get-Item $backupFile
    Write-Host "[2/2] Respaldo generado EXITOSAMENTE." -ForegroundColor Green
    Write-Host "   -> Archivo : $($fileInfo.Name)" -ForegroundColor White
    Write-Host "   -> Ruta    : $($fileInfo.FullName)" -ForegroundColor White
    Write-Host "   -> Tamano  : $([math]::Round($fileInfo.Length / 1KB, 2)) KB" -ForegroundColor White
    Write-Host ""
    Write-Host " El respaldo contiene TODOS los datos de produccion (usuarios," -ForegroundColor Green
    Write-Host " transacciones, metas de ahorro) del servidor Aiven en la nube." -ForegroundColor Green
} else {
    Write-Host "[ERROR] Fallo la generacion del respaldo." -ForegroundColor Red
    Write-Host "  Verifique que mysqldump este instalado y que el servidor" -ForegroundColor Red
    Write-Host "  Aiven sea accesible desde esta red." -ForegroundColor Red
}
Write-Host "============================================================" -ForegroundColor Cyan
