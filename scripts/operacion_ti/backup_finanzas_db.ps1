param(
    [string]$DbUser = "root",
    [string]$DbPassword = "",
    [string]$DbName = "finanzas_db",
    [string]$BackupDir = "$PSScriptRoot\..\..\db\backups"
)

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
Write-Host " Operacion TI - Respaldo de Base de Datos ($DbName)" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "[1/2] Ejecutando respaldo usando: $mysqldumpPath" -ForegroundColor Yellow

if ($DbPassword -eq "") {
    & $mysqldumpPath -u $DbUser $DbName --default-character-set=utf8mb4 --routines --triggers > $backupFile
} else {
    & $mysqldumpPath -u $DbUser -p"$DbPassword" $DbName --default-character-set=utf8mb4 --routines --triggers > $backupFile
}

if ($LASTEXITCODE -eq 0 -and (Test-Path $backupFile) -and (Get-Item $backupFile).Length -gt 0) {
    $fileInfo = Get-Item $backupFile
    Write-Host "[2/2] Respaldo generado EXITOSAMENTE." -ForegroundColor Green
    Write-Host "   -> Archivo : $($fileInfo.Name)" -ForegroundColor White
    Write-Host "   -> Ruta    : $($fileInfo.FullName)" -ForegroundColor White
    Write-Host "   -> Tamano  : $([math]::Round($fileInfo.Length / 1KB, 2)) KB" -ForegroundColor White
} else {
    Write-Host "[ERROR] Fallo la generacion del respaldo. Verifique MySQL o credenciales." -ForegroundColor Red
}
Write-Host "============================================================" -ForegroundColor Cyan
