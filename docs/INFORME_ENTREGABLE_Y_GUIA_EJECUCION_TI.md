# 📘 Informe Completo de Implementación, Control de Versiones y Guía de Operación TI
**Proyecto:** FinanceTracker (`finanzas-app`) — Grupo 4  
**Cumplimiento Rúbrica APF3:** Criterio 2 (Implementación Funcional CUS 04), Criterio 3 (Operación del Servicio TI) y Criterio 4 (Calidad Técnica)  
**Fecha de Emisión:** 08 de julio de 2026  

---

## ✅ 1. Resumen de Cumplimiento de Indicaciones

| Indicación del Usuario | Estado | ¿Qué y cómo se implementó? | Archivos Modificados / Creados |
| :--- | :---: | :--- | :--- |
| **1. Colocar el Dashboard según el Documento (CUS 04)** | ✅ **100% CUMPLIDO** | Se rediseñó la vista principal `Bienvenido.jsx` integrando **gráficos financieros con `recharts`** (PieChart de Ingresos vs. Gastos y BarChart resumen), **tabla de últimas 5 transacciones** y **sección de progreso de metas de ahorro** con barras dinámicas y alertas visuales. | • `finanzas-app-frontend/src/modules/inicio/pages/Bienvenido.jsx`<br>• `finanzas-app-frontend/src/styles/pages/Bienvenido.scss`<br>• `finanzas-app-frontend/package.json` |
| **2. Implementar la Operación TI** | ✅ **100% CUMPLIDO** | Se automatizaron los procedimientos de **Continuidad y Respaldo de Base de Datos** mediante scripts PowerShell con autodetección de MySQL 9.6/8.0, además de manuales y protocolos de **simulación y gestión de incidentes TI (INC-01, INC-02, INC-03)**. | • `scripts/operacion_ti/backup_finanzas_db.ps1`<br>• `scripts/operacion_ti/restore_finanzas_db.ps1`<br>• `docs/OPERACION_TI_Y_LOGS.md` |
| **3. Apartado de Logs Importantes** | ✅ **100% CUMPLIDO** | Se configuró **Logback / SLF4J** en Spring Boot con archivo rotativo (`finanzas-app.log`, máx 5MB) y niveles diferenciados por capa DDD. Se instrumentaron los controladores clave para auditar inicios de sesión, registros contables y descargas de PDF, además de crear un monitor en vivo. | • `finanzas-app-backend/src/main/resources/application.properties`<br>• `UsuarioController.java`<br>• `TransaccionController.java`<br>• `ReporteFinancieroController.java`<br>• `scripts/operacion_ti/monitoreo_logs.ps1` |

---

## 📦 2. Detalle Exhaustivo de lo Agregado

### A. Módulo Dashboard — CUS 04 (`Bienvenido.jsx`)
1. **Gráfico Circular (`PieChart` de Recharts):** Muestra el porcentaje y monto exacto de la distribución entre ingresos y gastos del usuario.
2. **Gráfico de Barras (`BarChart`):** Comparativa directa de las 3 columnas financieras vitales: Ingresos, Gastos y Saldo Neto.
3. **Historial Rápido de Movimientos:** Tabla con las últimas 5 transacciones ordenadas cronológicamente en forma descendente, con etiquetas (`badge`) en verde/rojo según el tipo de operación.
4. **Tarjetas de Progreso de Metas:** Muestra cada meta activa, su categoría, porcentaje de avance calculado, barra gráfica visual e indicador de estado `✅ Cumplida`.

### B. Arquitectura de Logs de Operación TI (`application.properties` + Controllers)
1. **Rotación de Log (`logging.file.name=logs/finanzas-app.log`):**
   - Evita la saturación del disco rotando archivos de 5 MB hasta un máximo de 7 históricos (`max-history=7`).
2. **Instrumentación SLF4J en API REST:**
   - **`UsuarioController`:** Emite logs `INFO` de intentos de login exitosos y logs `WARN` para fallos de autenticación (evidencia para auditoría y ataques de fuerza bruta).
   - **`TransaccionController`:** Emite logs `INFO` con el tipo y monto por cada operación de ingreso/gasto registrada.
   - **`ReporteFinancieroController`:** Emite logs `INFO` cada vez que se compila y exporta un documento PDF.

### C. Suite Operacional TI (`scripts/operacion_ti/`)
1. **`backup_finanzas_db.ps1`:** Localiza automáticamente `mysqldump.exe` en las rutas del sistema y genera un respaldo `.sql` etiquetado con fecha y hora exactas (`yyyyMMdd_HHmmss`).
2. **`restore_finanzas_db.ps1`:** Restaura la base de datos `finanzas_db` desde cualquier archivo SQL de respaldo en caso de corrupción o prueba de contingencia.
3. **`monitoreo_logs.ps1`:** Monitor en vivo en consola (`tail -f`) que resalta en **Rojo (ERROR)**, **Amarillo (WARN)** y **Verde/Cian (INFO/LOGIN/TRANSACCION)** los eventos que ocurren en tiempo real en la plataforma.

---

## 🚀 3. Orden de Ejecución para Subir al Repositorio (Control de Versiones)

Para mantener un historial de Git limpio, semántico y alineado con buenas prácticas profesionales, **ejecute los commits en el siguiente orden estricto** desde su terminal en la raíz del proyecto (`d:\Descargas\Proyecto Integrador 2\finanzas-app`):

### 1️⃣ Primer Commit: Cambios en Frontend (Dashboard y Gráficos)
Este commit encapsula toda la funcionalidad visual y dependencias del CUS 04.

```powershell
cd "d:\Descargas\Proyecto Integrador 2\finanzas-app"

# 1. Agregar archivos modificados del Frontend
git add finanzas-app-frontend/src/modules/inicio/pages/Bienvenido.jsx
git add finanzas-app-frontend/src/styles/pages/Bienvenido.scss
git add finanzas-app-frontend/package.json
git add finanzas-app-frontend/package-lock.json

# 2. Crear el commit
git commit -m "feat(dashboard): implementar CUS 04 con graficos financieros, tabla de transacciones y metas de ahorro"
```

### 2️⃣ Segundo Commit: Cambios en Backend (Logs y Auditoría TI)
Este commit encapsula la configuración de Logback y la instrumentación SLF4J en las capas de control REST.

```powershell
# 1. Agregar archivos modificados del Backend
git add finanzas-app-backend/src/main/resources/application.properties
git add finanzas-app-backend/src/main/java/com/utp/finanzasApp/sales/interfaces/controller/UsuarioController.java
git add finanzas-app-backend/src/main/java/com/utp/finanzasApp/sales/interfaces/controller/TransaccionController.java
git add finanzas-app-backend/src/main/java/com/utp/finanzasApp/sales/interfaces/controller/ReporteFinancieroController.java

# 2. Crear el commit
git commit -m "feat(backend-logs): instrumentar trazabilidad SLF4J por capa DDD y rotacion de logs para operacion TI"
```

### 3️⃣ Tercer Commit: Scripts de Operación TI y Documentación
Este commit añade las herramientas operacionales de respaldo, recuperación y el manual técnico.

```powershell
# 1. Agregar scripts y manuales de Operación TI
git add scripts/operacion_ti/
git add docs/OPERACION_TI_Y_LOGS.md
git add docs/INFORME_ENTREGABLE_Y_GUIA_EJECUCION_TI.md

# 2. Crear el commit
git commit -m "docs(operacion-ti): agregar manual de operacion TI, scripts de backup/restore y simulacion de incidentes"

# 3. Subir todos los cambios al repositorio remoto (GitHub)
git push origin main
```

---

## ⚙️ 4. Guía de Ejecución Paso a Paso: Operación TI, Monitoreo y Backups

### 🛠️ A. Cómo Ejecutar un Respaldo (Backup) de la Base de Datos
1. Abra una ventana de **PowerShell** en la carpeta principal del proyecto (`finanzas-app`).
2. Ejecute el comando:
   ```powershell
   powershell.exe -ExecutionPolicy Bypass -File ".\scripts\operacion_ti\backup_finanzas_db.ps1"
   ```
3. **Verificación de éxito:** Verá una salida verde confirmando la creación del archivo y podrá inspeccionarlo en la carpeta `db\backups\`:
   ```text
   [2/2] Respaldo generado EXITOSAMENTE.
      -> Archivo : finanzas_db_backup_20260708_174612.sql
      -> Ruta    : D:\Descargas\Proyecto Integrador 2\finanzas-app\db\backups\finanzas_db_backup_20260708_174612.sql
      -> Tamano  : 11.89 KB
   ```

### 🛠️ B. Cómo Ejecutar una Restauración (Restore) de la Base de Datos
Si desea simular un incidente de contingencia o restaurar un punto de control previo:
1. Identifique el archivo SQL que desea restaurar dentro de `db\backups\`.
2. Ejecute el comando indicando la ruta del archivo con el parámetro `-BackupFilePath`:
   ```powershell
   powershell.exe -ExecutionPolicy Bypass -File ".\scripts\operacion_ti\restore_finanzas_db.ps1" -BackupFilePath ".\db\backups\finanzas_db_backup_20260708_174612.sql"
   ```

### 🛠️ C. Cómo Monitorear los Logs en Tiempo Real (Ideal para el Video Final)
Para demostrar en el video cómo el sistema registra y audita eventos en tiempo real:
1. Abra una ventana de **PowerShell** y lance el monitor visual:
   ```powershell
   powershell.exe -ExecutionPolicy Bypass -File ".\scripts\operacion_ti\monitoreo_logs.ps1"
   ```
2. Interactúe con la aplicación web (`http://localhost:3000`):
   - Inicie sesión (verá aparecer líneas en **Verde**: `[LOGIN] Inicio de sesión exitoso`).
   - Registre un nuevo gasto o ingreso (verá aparecer líneas en **Cian**: `[TRANSACCION] Registrando GASTO de S/100.0`).
   - Si intenta iniciar sesión con una clave errónea para simular un incidente (verá aparecer una línea en **Amarillo**: `[LOGIN] Intento de inicio de sesión fallido`).
