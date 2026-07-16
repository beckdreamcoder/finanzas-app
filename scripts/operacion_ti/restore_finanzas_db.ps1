<#
.SYNOPSIS
    Script de Recuperación (Restore) - FinanceTracker (Producción - Aiven)
.DESCRIPTION
    Restaura la base de datos de producción en Aiven Cloud a partir de un
    archivo SQL de respaldo generado por backup_finanzas_db.ps1.
#>

param(
    [Parameter(Mandatory=$true)]
    [string]$BackupFilePath,
    [string]$DbHost = "mysql-32b27fc9-janitojahuarc-ec57.a.aivencloud.com",
    [int]$DbPort = 26994,
    [string]$DbUser = "avnadmin",
    [string]$DbPassword = $(if ($env:AIVEN_PASSWORD) { $env:AIVEN_PASSWORD } elseif ($env:DB_PASSWORD) { $env:DB_PASSWORD } else { "" }),
    [string]$DbName = "defaultdb"
)

if (!$DbPassword) {
    Write-Host "[ERROR] Contraseña de base de datos no proporcionada." -ForegroundColor Red
    Write-Host "Define la variable de entorno AIVEN_PASSWORD (o DB_PASSWORD) o pasa -DbPassword al ejecutar." -ForegroundColor Yellow
    exit 1
}

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
Write-Host " Operacion TI - Recuperacion de BD de PRODUCCION" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host " Servidor : $DbHost`:$DbPort (Aiven Cloud)" -ForegroundColor Gray
Write-Host " Base datos: $DbName" -ForegroundColor Gray
Write-Host " Archivo   : $BackupFilePath" -ForegroundColor Gray
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""
# Verificar si el archivo está en formato UTF-16LE (BOM 0xFF 0xFE) y convertir a UTF-8 para mysql.exe
$contentBytes = [System.IO.File]::ReadAllBytes($BackupFilePath)
$fileToRestore = $BackupFilePath
$tempConvertedFile = $null

if ($contentBytes.Length -ge 2 -and $contentBytes[0] -eq 0xFF -and $contentBytes[1] -eq 0xFE) {
    Write-Host " [INFO] Archivo detectado en formato UTF-16LE. Convirtiendo temporalmente a UTF-8 para MySQL..." -ForegroundColor Yellow
    $utf8Content = [System.IO.File]::ReadAllText($BackupFilePath)
    $tempConvertedFile = Join-Path $env:TEMP "restore_temp_$(Get-Date -Format 'yyyyMMdd_HHmmss').sql"
    # Escribir sin BOM en UTF-8
    $utf8WithoutBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($tempConvertedFile, $utf8Content, $utf8WithoutBom)
    $fileToRestore = $tempConvertedFile
}

cmd /c "`"$mysqlPath`" -h $DbHost -P $DbPort -u $DbUser -p`"$DbPassword`" --ssl-mode=REQUIRED --default-character-set=utf8mb4 $DbName < `"$fileToRestore`""

if ($null -ne $tempConvertedFile -and (Test-Path $tempConvertedFile)) {
    Remove-Item $tempConvertedFile -Force -ErrorAction SilentlyContinue
}

if ($LASTEXITCODE -eq 0) {
    Write-Host "[2/2] Base de datos de PRODUCCION restaurada EXITOSAMENTE." -ForegroundColor Green
    Write-Host ""
    Write-Host " Los datos fueron restaurados en el servidor Aiven en la nube." -ForegroundColor Green
    Write-Host " Los cambios son visibles inmediatamente en la aplicacion web." -ForegroundColor Green
} else {
    Write-Host "[ERROR] Ocurrio un problema durante la restauracion." -ForegroundColor Red
    Write-Host "  Verifique la conexion a Aiven y que mysql.exe este instalado." -ForegroundColor Red
}
Write-Host "============================================================" -ForegroundColor Cyan
