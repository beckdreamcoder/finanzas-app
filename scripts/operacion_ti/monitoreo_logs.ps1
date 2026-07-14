<#
.SYNOPSIS
    Script de Monitoreo en Vivo de Logs e Incidentes TI - FinanceTracker
.DESCRIPTION
    Muestra en tiempo real las entradas de log generadas por la aplicación
    Spring Boot (finanzas-app.log) con resaltado de color para advertencias y errores.
#>

param(
    [string]$LogFile = "$PSScriptRoot\..\..\finanzas-app-backend\logs\finanzas-app.log"
)

Write-Host "==========================================================================" -ForegroundColor Cyan
Write-Host " OPERACIÓN TI — MONITOREO DE LOGS EN TIEMPO REAL (FinanceTracker)" -ForegroundColor Cyan
Write-Host " Archivo monitoreado: $LogFile" -ForegroundColor Gray
Write-Host " Presione Ctrl+C para detener el monitoreo." -ForegroundColor Gray
Write-Host "==========================================================================" -ForegroundColor Cyan

if (!(Test-Path $LogFile)) {
    Write-Host "[INFO] El archivo de log aún no se ha creado. Esperando que Spring Boot registre eventos..." -ForegroundColor Yellow
}

Get-Content -Path $LogFile -Tail 30 -Wait | ForEach-Object {
    $line = $_
    if ($line -match "ERROR") {
        Write-Host $line -ForegroundColor Red
    } elseif ($line -match "WARN") {
        Write-Host $line -ForegroundColor Yellow
    } elseif ($line -match "LOGIN|AUTH") {
        Write-Host $line -ForegroundColor Green
    } elseif ($line -match "TRANSACCION|REPORTE") {
        Write-Host $line -ForegroundColor Cyan
    } else {
        Write-Host $line
    }
}
