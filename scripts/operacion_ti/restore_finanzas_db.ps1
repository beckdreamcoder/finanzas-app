<#
.SYNOPSIS
    Script de Recuperación (Restore) - Proyecto FinanceTracker (finanzas_db)
.DESCRIPTION
    Restaura la base de datos finanzas_db a partir de un archivo SQL de respaldo.
#>

param(
    [Parameter(Mandatory=$true)]
    [string]$BackupFilePath,
    [string]$DbUser = "root",
    [string]$DbPassword = "",
    [string]$DbName = "finanzas_db"
)

if (!(Test-Path $BackupFilePath)) {
    Write-Host "[ERROR] El archivo de respaldo no existe: $BackupFilePath" -ForegroundColor Red
    exit 1
}

# Buscar mysql.exe en rutas conocidas
$mysqlPath = $null
$rutasComunes = @(
    "C:\Program Files\MySQL\MySQL Server 9.6\bin\mysql.exe",
    "C:\Program Files\MySQL\MySQL Server 9.5\bin\mysql.exe",
    "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe",
    "C:\Program Files\MySQL\MySQL Workbench 8.0 CE\mysql.exe"
)

foreach ($ruta in $rutasComunes) {
    if (Test-Path $ruta) {
        $mysqlPath = $ruta
        break
    }
}

if ($null -eq $mysqlPath) {
    $mysqlPath = "mysql"
}

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host " Operacion TI - Recuperacion de Base de Datos ($DbName)" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "[1/2] Restaurando respaldo desde: $BackupFilePath" -ForegroundColor Yellow

if ($DbPassword -eq "") {
    cmd /c "`"$mysqlPath`" -u $DbUser $DbName < `"$BackupFilePath`""
} else {
    cmd /c "`"$mysqlPath`" -u $DbUser -p`"$DbPassword`" $DbName < `"$BackupFilePath`""
}

if ($LASTEXITCODE -eq 0) {
    Write-Host "[2/2] Base de datos restaurada EXITOSAMENTE." -ForegroundColor Green
} else {
    Write-Host "[ERROR] Ocurrio un problema durante la restauracion." -ForegroundColor Red
}
Write-Host "============================================================" -ForegroundColor Cyan
