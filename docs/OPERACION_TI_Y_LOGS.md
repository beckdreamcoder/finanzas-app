# 🛠️ Manual de Operación de Servicio de TI, Monitoreo y Gestión de Incidentes
**Proyecto:** FinanceTracker (`finanzas-app`) — Grupo 4  
**Cumplimiento:** Criterio 3 de la Rúbrica APF3 y Requisitos 9, 10 y 11 del Video de Exposición  

---

## 1. Estructura y Políticas de Monitoreo (Logs Importantes)

El sistema **FinanceTracker** implementa un esquema de trazabilidad estructurado basado en **SLF4J/Logback** dentro del backend Spring Boot (`finanzas-app-backend`). Los logs se almacenan tanto en consola (para desarrollo) como de manera persistente con rotación en el sistema de archivos del servidor.

### 📍 Ubicación y Rotación de Logs
- **Ruta del archivo de log:** `finanzas-app-backend/logs/finanzas-app.log`
- **Política de rotación:** Archivos de máximo `5 MB`, conservando un histórico de 7 archivos (`max-history=7`) y un límite global de `35 MB`.

### 🎚️ Niveles de Logging por Capa Arquitectónica (DDD)
| Capa / Componente | Paquete Java | Nivel de Log | Eventos Registrados |
| :--- | :--- | :--- | :--- |
| **Controladores (API REST)** | `sales.interfaces.controller` | `INFO` | Peticiones HTTP entrantes, parámetros de consulta, códigos de respuesta |
| **Lógica de Aplicación** | `sales.application.service` | `INFO` | Ejecución de casos de uso financieros (cálculos de saldo, progreso de metas) |
| **Seguridad / JWT** | `support.JwtUtil`, `SeguridadConfig` | `INFO` / `WARN` | Autenticación exitosa, tokens expirados, intentos de acceso denegados |
| **Repositorios / Persistencia** | `sales.infrastructure` | `WARN` / `ERROR` | Excepciones SQL, fallos de conexión a MySQL, violaciones de constraints |

### 📌 Eventos Críticos Logueados en el Sistema
1. **Autenticación e Identidad (`[LOGIN]`, `[REGISTRO]`):**
   - Registro de inicio de sesión exitoso o denegado (intento no autorizado con correo y motivo).
   - Creación de nuevos usuarios con ID y correo censurado/enmascarado.
2. **Finanzas Contables (`[TRANSACCION]`):**
   - Creación, modificación y eliminación de ingresos/gastos con monto y usuario emisor.
3. **Auditoría Documental (`[REPORTE]`):**
   - Emisión y exportación de reportes PDF de estado de cuenta.

---

## 2. Gestión de Continuidad y Respaldo de Base de Datos (Backups)

Para garantizar la **continuidad del servicio** y protección frente a pérdida de información financiera (RNF de Fiabilidad y Disponibilidad), se han implementado scripts automatizados de respaldo y recuperación en el directorio `scripts/operacion_ti/`.

### 💾 1. Respaldo Automatizado (`backup_finanzas_db.ps1`)
Genera un volcado completo de estructura y datos de `finanzas_db` en formato `.sql`, estampando la marca de tiempo (timestamp) en el nombre del archivo.

```powershell
# Ejecución desde powershell (en la raíz o carpeta scripts/operacion_ti)
.\scripts\operacion_ti\backup_finanzas_db.ps1 -DbUser "root" -DbPassword ""
```
*Salida esperada:* Crea el archivo en `db/backups/finanzas_db_backup_YYYYMMDD_HHmmss.sql`.

### ♻️ 2. Restauración Ante Desastres (`restore_finanzas_db.ps1`)
Permite reconstruir la base de datos de manera inmediata a partir de cualquier archivo de respaldo validado.

```powershell
.\scripts\operacion_ti\restore_finanzas_db.ps1 -BackupFilePath ".\db\backups\finanzas_db_backup_20260708_180000.sql"
```

---

## 3. Gestión y Simulación de Incidentes TI (Guía para Sustentación / Video)

A continuación se documentan **3 escenarios reales de incidentes TI** junto con su diagnóstico mediante logs y el protocolo de respuesta operativa:

| ID | Incidente | Detección / Log Evidencia | Acción Correctiva / Protocolo TI |
| :---: | :--- | :--- | :--- |
| **INC-01** | **Ataque de Fuerza Bruta / Credenciales Incorrectas** | Log nivel `WARN`: `[LOGIN] Intento de inicio de sesión fallido para el correo: xxx@correo.com — Razón: Bad credentials` | 1. Monitorear frecuencia con `monitoreo_logs.ps1`.<br>2. Si supera umbral, validar bloqueo por IP en firewall o límite de peticiones (Rate Limiting). |
| **INC-02** | **Error de Inserción / Saldo Insuficiente en Meta** | Log nivel `ERROR` o `WARN` desde `TransaccionController` indicando rechazo de transacción por validación de negocio. | 1. Verificar en `finanzas-app.log` el ID de usuario involucrado.<br>2. Confirmar que el frontend comunique claramente el mensaje de saldo insuficiente devuelto por la API. |
| **INC-03** | **Caída o Corrupción de Base de Datos MySQL** | Excepción `DataAccessException` / `CommunicationsException` en logs al intentar ejecutar una consulta JPA. | 1. Verificar estado del servicio MySQL 8.0.<br>2. En caso de corrupción de tabla, ejecutar `restore_finanzas_db.ps1` con el último backup validado. |

---

## 4. Instrucciones para Demostrar en el Video Final

1. **Mostrar el archivo de configuración (`application.properties`):**
   - Explicar cómo se configuró `logging.file.name=logs/finanzas-app.log` y las políticas de rotación de 5MB.
2. **Abrir la terminal y ejecutar el monitor en vivo:**
   ```powershell
   .\scripts\operacion_ti\monitoreo_logs.ps1
   ```
3. **Realizar acciones en el Frontend (`http://localhost:3000`):**
   - Iniciar sesión, registrar un ingreso y generar un reporte PDF.
   - Mostrar en la terminal cómo aparecen en color verde (`[LOGIN]`), cian (`[TRANSACCION]`, `[REPORTE]`).
4. **Simular un Respaldo en vivo:**
   - Ejecutar `.\scripts\operacion_ti\backup_finanzas_db.ps1` y mostrar la carpeta `db/backups/` con el nuevo archivo `.sql`.
