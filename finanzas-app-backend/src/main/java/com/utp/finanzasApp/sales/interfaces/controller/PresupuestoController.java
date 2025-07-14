package com.utp.finanzasApp.sales.interfaces.controller;

import com.utp.finanzasApp.sales.application.service.ActualizarPresupuestoService;
import com.utp.finanzasApp.sales.application.service.ConsultaPresupuestoService;
import com.utp.finanzasApp.sales.application.service.GestionPresupuestoService;
import com.utp.finanzasApp.sales.domain.model.Presupuesto;
import com.utp.finanzasApp.sales.interfaces.dto.ActualizarPresupuestoDTO;
import com.utp.finanzasApp.sales.interfaces.dto.RegistrarPresupuestoDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/presupuestos")
public class PresupuestoController {

    private final GestionPresupuestoService service;
    private final ConsultaPresupuestoService consultaPresupuestoService;
    private final ActualizarPresupuestoService actualizarPresupuestoService; // ← FALTA INYECTAR ESTO

    public PresupuestoController(
            GestionPresupuestoService service,
            ConsultaPresupuestoService consultaPresupuestoService,
            ActualizarPresupuestoService actualizarPresupuestoService // ← FALTA EN EL CONSTRUCTOR
    ) {
        this.service = service;
        this.consultaPresupuestoService = consultaPresupuestoService;
        this.actualizarPresupuestoService = actualizarPresupuestoService;
    }

    @PostMapping("/registrar")
    public ResponseEntity<Presupuesto> registrar(@RequestBody RegistrarPresupuestoDTO dto) {
        Presupuesto nuevo = service.registrar(dto);
        return ResponseEntity.ok(nuevo);
    }

    @GetMapping("/usuario/{usuarioId}/mes/{mes}/anio/{anio}")
    public ResponseEntity<Presupuesto> obtenerPresupuesto(
            @PathVariable Long usuarioId,
            @PathVariable int mes,
            @PathVariable int anio) {

        Presupuesto presupuesto = consultaPresupuestoService.obtenerPorUsuarioYMes(usuarioId, mes, anio);
        return ResponseEntity.ok(presupuesto);
    }

    @PutMapping("/actualizar")
    public ResponseEntity<Presupuesto> actualizar(@RequestBody ActualizarPresupuestoDTO dto) {
        Presupuesto actualizado = actualizarPresupuestoService.actualizar(dto);
        return ResponseEntity.ok(actualizado);
    }
}
