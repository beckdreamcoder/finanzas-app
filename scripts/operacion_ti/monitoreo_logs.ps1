<#
.SYNOPSIS
    Script de Monitoreo de Logs e Incidentes TI - FinanceTracker
.DESCRIPTION
    Muestra las entradas de log generadas por Spring Boot (finanzas-app.log
    o logs exportados de Render) con resaltado de color para advertencias,
    errores y eventos de auditoria ([LOGIN], [REGISTRO], [TRANSACCION]).
#>

param(
    [string]$LogFile = "$PSScriptRoot\..\..\finanzas-app-backend\logs\finanzas-app.log",
    [switch]$Estatico
)

$enVivo = !$Estatico

Write-Host "==========================================================================" -ForegroundColor Cyan
Write-Host " OPERACION TI -- MONITOREO DE LOGS E INCIDENTES (FinanceTracker)" -ForegroundColor Cyan
Write-Host " Archivo monitoreado: $LogFile" -ForegroundColor Gray
if ($enVivo) {
    Write-Host " Modo              : Tiempo real (-Wait). Presione Ctrl+C para salir." -ForegroundColor Gray
} else {
    Write-Host " Modo              : Auditoria historica (estatico / exportado de nube)" -ForegroundColor Gray
}
Write-Host "==========================================================================" -ForegroundColor Cyan

if (!(Test-Path $LogFile)) {
    Write-Host "[INFO] El archivo de log no existe o aun no se ha creado: $LogFile" -ForegroundColor Yellow
    exit
}

$getParams = @{ Path = $LogFile }
if ($enVivo) {
    $getParams.Tail = 30
    $getParams.Wait = $true
}

Get-Content @getParams | ForEach-Object {
    $line = $_
    if ($line -match "ERROR") {
        Write-Host $line -ForegroundColor Red
    } elseif ($line -match "WARN") {
        Write-Host $line -ForegroundColor Yellow
    } elseif ($line -match "LOGIN|AUTH|REGISTRO") {
        Write-Host $line -ForegroundColor Green
    } elseif ($line -match "TRANSACCION|REPORTE") {
        Write-Host $line -ForegroundColor Cyan
    } else {
        Write-Host $line
    }
}
