<#
.SYNOPSIS
    Programar Respaldo Automatico Diario (Windows Task Scheduler) - FinanceTracker
.DESCRIPTION
    Registra una Tarea Programada en Windows para que el script backup_finanzas_db.ps1
    se ejecute automaticamente todos los dias a la hora especificada.
    Evidencia perfecta para Operacion TI (Automatizacion de Respaldos).
#>

param(
    [string]$HoraEjecucion = "23:59",
    [string]$NombreTarea = "FinanceTracker_Respaldo_Diario"
)

$scriptBackup = "$PSScriptRoot\backup_finanzas_db.ps1"

if (!(Test-Path $scriptBackup)) {
    Write-Host "[ERROR] No se encontro el script de backup en: $scriptBackup" -ForegroundColor Red
    exit 1
}

Write-Host "==========================================================================" -ForegroundColor Cyan
Write-Host " OPERACION TI -- PROGRAMACION DE RESPALDO AUTOMATICO (Windows)" -ForegroundColor Cyan
Write-Host " Tarea     : $NombreTarea" -ForegroundColor Gray
Write-Host " Script    : $scriptBackup" -ForegroundColor Gray
Write-Host " Frecuencia: Diario a las $HoraEjecucion" -ForegroundColor Gray
Write-Host "==========================================================================" -ForegroundColor Cyan
Write-Host ""

try {
    # Eliminar tarea previa si ya existia
    Unregister-ScheduledTask -TaskName $NombreTarea -Confirm:$false -ErrorAction SilentlyContinue | Out-Null

    # Crear la accion de ejecutar PowerShell en segundo plano con el script
    $Action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-ExecutionPolicy Bypass -WindowStyle Hidden -File `"$scriptBackup`""
    
    # Crear el disparador diario
    $Trigger = New-ScheduledTaskTrigger -Daily -At $HoraEjecucion
    
    # Configurar para que se ejecute con los permisos del usuario actual
    $Principal = New-ScheduledTaskPrincipal -UserId $env:USERNAME -LogonType Interactive
    $Settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable

    # Registrar la tarea programada
    Register-ScheduledTask -TaskName $NombreTarea -Action $Action -Trigger $Trigger -Principal $Principal -Settings $Settings | Out-Null

    Write-Host "[EXITO] Tarea automatica programada correctamente." -ForegroundColor Green
    Write-Host ""
    Write-Host " El sistema tomara una copia de seguridad de la base de datos de produccion" -ForegroundColor White
    Write-Host " en Aiven todos los dias a las $HoraEjecucion y la guardara en db/backups/." -ForegroundColor White
    Write-Host ""
    Write-Host " -> Para verla o gestionarla en Windows:" -ForegroundColor Yellow
    Write-Host "    Abre el Programador de tareas (taskschd.msc) y busca $NombreTarea." -ForegroundColor Yellow
} catch {
    Write-Host "[ERROR] No se pudo programar la tarea. Asegurate de ejecutar como Administrador o verifica los permisos: $_" -ForegroundColor Red
}
Write-Host "==========================================================================" -ForegroundColor Cyan
