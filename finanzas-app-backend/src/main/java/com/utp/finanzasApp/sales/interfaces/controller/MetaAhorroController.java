package com.utp.finanzasApp.sales.interfaces.controller;

import com.utp.finanzasApp.sales.application.service.ConsultaMetaAhorroService;
import com.utp.finanzasApp.sales.application.service.GestionMetaAhorroService;
import com.utp.finanzasApp.sales.application.service.RegistrarMetaAhorroService;
import com.utp.finanzasApp.sales.domain.model.MetaAhorro;
import com.utp.finanzasApp.sales.interfaces.dto.AporteMetaDTO;
import com.utp.finanzasApp.sales.interfaces.dto.RegistrarMetaAhorroDTO;
import com.utp.finanzasApp.sales.interfaces.dto.ProgresoMetaDTO;
import com.utp.finanzasApp.support.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/metas")
public class MetaAhorroController {

    private final RegistrarMetaAhorroService registrarMetaAhorroService;
    private final ConsultaMetaAhorroService consultaMetaAhorroService;
    private final GestionMetaAhorroService gestionMetaAhorroService;

    @Autowired
    private JwtUtil jwtUtil;

    public MetaAhorroController(
            RegistrarMetaAhorroService registrarMetaAhorroService,
            ConsultaMetaAhorroService consultaMetaAhorroService,
            GestionMetaAhorroService gestionMetaAhorroService

    ) {
        this.registrarMetaAhorroService = registrarMetaAhorroService;
        this.consultaMetaAhorroService = consultaMetaAhorroService;
        this.gestionMetaAhorroService = gestionMetaAhorroService;
    }

    //REGISTRAR UNA META- (
    // http://localhost:8080/api/metas/registrar.
    /*{
         "montoObjetivo": 6500.0,
         "fechaLimite": "2025-12-30",
         "categoria": "Regalo",
         "descripcion": "Comprar una computadora",
         "frecuencia": "MENSUAL"
       }*/
    @PostMapping("/registrar")
    public ResponseEntity<MetaAhorro> registrar(
            @RequestHeader("Authorization") String token,
            @RequestBody RegistrarMetaAhorroDTO dto) {

        Long usuarioId = jwtUtil.obtenerUsuarioIdDesdeToken(token);
        MetaAhorro meta = registrarMetaAhorroService.registrar(usuarioId, dto);
        return ResponseEntity.ok(meta);
    }

    //LISTAR METAS DE UN USUARIO LOGEADO
    @GetMapping("/mis-metas")
    public ResponseEntity<List<MetaAhorro>> obtenerMetasDelUsuarioAutenticado(
            @RequestHeader("Authorization") String token) {

        Long usuarioId = jwtUtil.obtenerUsuarioIdDesdeToken(token);
        List<MetaAhorro> metas = consultaMetaAhorroService.obtenerPorUsuario(usuarioId);
        return ResponseEntity.ok(metas);
    }

    @PostMapping("/{metaId}/aportar")
    public ResponseEntity<?> aportarAMeta(
            @PathVariable Long metaId,
            @RequestHeader("Authorization") String token,
            @RequestBody AporteMetaDTO aporteDTO) {

        Long usuarioId = jwtUtil.obtenerUsuarioIdDesdeToken(token);
        gestionMetaAhorroService.aportarAMeta(metaId, usuarioId, aporteDTO.getMonto());

        return ResponseEntity.ok("Aporte realizado exitosamente.");
    }


    @GetMapping("/{metaId}/progreso")
    public ResponseEntity<ProgresoMetaDTO> obtenerProgresoMeta(
            @PathVariable Long metaId,
            @RequestHeader("Authorization") String token) {

        Long usuarioId = jwtUtil.obtenerUsuarioIdDesdeToken(token);
        ProgresoMetaDTO progreso = gestionMetaAhorroService.calcularProgreso(metaId, usuarioId);
        return ResponseEntity.ok(progreso);
    }


    @PutMapping("/actualizar/{metaId}")
    public ResponseEntity<?> actualizarMeta(
            @PathVariable Long metaId,
            @RequestBody RegistrarMetaAhorroDTO dto,
            @RequestHeader("Authorization") String token) {

        try {
            Long usuarioIdDesdeToken = jwtUtil.obtenerUsuarioIdDesdeToken(token);

            // Buscar la meta por ID
            MetaAhorro metaExistente = consultaMetaAhorroService.obtenerPorId(metaId);

            // Validar que el usuario autenticado sea el dueño
            if (!metaExistente.getUsuarioId().equals(usuarioIdDesdeToken)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("No tienes permiso para modificar esta meta.");
            }

            // Actualizar la meta
            MetaAhorro metaActualizada = registrarMetaAhorroService.actualizar(metaId, usuarioIdDesdeToken, dto);
            return ResponseEntity.ok(metaActualizada);

        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("La meta con ID " + metaId + " no existe.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al actualizar la meta.");
        }
    }


    @DeleteMapping("delete/{metaId}")
    public ResponseEntity<?> eliminarMeta(
            @PathVariable Long metaId,
            @RequestHeader("Authorization") String token) {

        try {
            Long usuarioIdDesdeToken = jwtUtil.obtenerUsuarioIdDesdeToken(token);
            MetaAhorro meta = consultaMetaAhorroService.obtenerPorId(metaId);

            if (!meta.getUsuarioId().equals(usuarioIdDesdeToken)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("No tienes permiso para eliminar esta meta.");
            }

            registrarMetaAhorroService.eliminarMetaPorId(metaId);
            return ResponseEntity.noContent().build();

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Ocurrió un error al eliminar la meta.");
        }
    }


}
