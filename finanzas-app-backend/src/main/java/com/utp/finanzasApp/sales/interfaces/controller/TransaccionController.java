package com.utp.finanzasApp.sales.interfaces.controller;

import com.utp.finanzasApp.sales.application.service.RegistroTransaccionService;
import com.utp.finanzasApp.sales.application.service.ConsultaTransaccionesService;
import com.utp.finanzasApp.sales.domain.model.Transaccion;
import com.utp.finanzasApp.sales.interfaces.dto.ActualizarTransaccionDTO;
import com.utp.finanzasApp.sales.interfaces.dto.ProgresoMetaDTO;
import com.utp.finanzasApp.sales.interfaces.dto.RegistrarTransaccionDTO;
import com.utp.finanzasApp.support.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/transacciones")
public class TransaccionController {

    private final RegistroTransaccionService registroTransaccionService;
    private final ConsultaTransaccionesService consultaTransaccionesService;
    @Autowired
    private JwtUtil jwtUtil;

    public TransaccionController(
            RegistroTransaccionService registroTransaccionService,
            ConsultaTransaccionesService consultaTransaccionesService
    ) {
        this.registroTransaccionService = registroTransaccionService;
        this.consultaTransaccionesService = consultaTransaccionesService;
    }

    //REGISTRAR UNA TRANSACCIÓN - TIPO (INGRESO - GASTO)
    @PostMapping("/registrar")
    public ResponseEntity<Transaccion> registrar(
            @RequestHeader("Authorization") String token,
            @RequestBody RegistrarTransaccionDTO dto
    ) {
        Long usuarioId = jwtUtil.obtenerUsuarioIdDesdeToken(token);
        Transaccion transaccion = registroTransaccionService.registrar(usuarioId, dto);
        return ResponseEntity.ok(transaccion);
    }


    //LISTA TODAS LAS TRANSACCIONES DE UN USUARIO - (1 usuario puede tener de 1 muchas transacciones)
    @GetMapping("/mis-transacciones")
    public ResponseEntity<List<Transaccion>> listarMisTransacciones(
            @RequestHeader("Authorization") String token
    ) {
        Long usuarioId = jwtUtil.obtenerUsuarioIdDesdeToken(token);
        List<Transaccion> transacciones = consultaTransaccionesService.obtenerPorUsuario(usuarioId);
        // Ordenar por fecha descendente (más reciente a más antigua)
        transacciones.sort((t1, t2) -> t2.getFecha().compareTo(t1.getFecha()));

        return ResponseEntity.ok(transacciones);
    }

    //EDITAR UNA TRANSACCIÓN - PUEDES EDITAR TODOS SUS CAMPOS
    @PutMapping("/actualizar/{id}")
    public ResponseEntity<?> actualizar(
            @PathVariable Long id,
            @RequestBody ActualizarTransaccionDTO dto,
            @RequestHeader("Authorization") String token) {

        try {
            Long usuarioIdDesdeToken = jwtUtil.obtenerUsuarioIdDesdeToken(token);

            Transaccion transaccionExistente = consultaTransaccionesService.obtenerPorId(id);

            /*if (!transaccionExistente.getUsuarioId().equals(usuarioIdDesdeToken)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("No tienes permiso para modificar esta transacción.");
            }

            // ✅ Validar formato de fecha si viene
            if (dto.getFecha() != null && !dto.getFecha().trim().isEmpty()) {
                try {
                    LocalDateTime.parse(dto.getFecha()); // esto lanza error si el formato es inválido
                } catch (DateTimeParseException e) {
                    return ResponseEntity.badRequest().body("La fecha tiene un formato inválido. Usa yyyy-MM-dd.");
                }
                COMENTÉ ESTO ANTES DEL CORTE DE LUZ - Que mala suerte
            }*/

            Transaccion actualizada = registroTransaccionService.actualizar(id, dto);
            return ResponseEntity.ok(actualizada);

        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("La transacción con ID " + id + " no existe.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al actualizar la transacción.");
        }
    }



    //ELIMINAR UNA TRANSACCIÓN- Tu puedes eliminar solo las transacciones que te pertenecen.
    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> eliminar(
            @PathVariable Long id,
            @RequestHeader("Authorization") String token) {

        try {
            Long usuarioIdDesdeToken = jwtUtil.obtenerUsuarioIdDesdeToken(token);
            Transaccion transaccionExistente = consultaTransaccionesService.obtenerPorId(id);

            if (!transaccionExistente.getUsuarioId().equals(usuarioIdDesdeToken)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("No tienes permiso para eliminar esta transacción.");
            }

            registroTransaccionService.eliminar(id);
            return ResponseEntity.noContent().build();

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Ocurrió un error al eliminar la transacción.");
        }
    }

    //*********************************** MEJORAR *************************************
    //Esto no va.
    /*@GetMapping("/{metaId}/progreso")
    public ResponseEntity<ProgresoMetaDTO> obtenerProgresoMeta(
            @PathVariable Long metaId,
            @RequestHeader("Authorization") String token) {

        Long usuarioId = jwtUtil.obtenerUsuarioIdDesdeToken(token);
        ProgresoMetaDTO progreso = GestionMetaAhorroService.calcularProgreso(Long metaId, Long usuarioId);
        return ResponseEntity.ok(progreso);
    }*/
    //*********************************** MEJORAR *************************************
}
