package com.utp.finanzasApp.sales.interfaces.controller;

import com.utp.finanzasApp.sales.application.service.SaldoService;
import com.utp.finanzasApp.support.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/saldo")
public class SaldoController {

    private final SaldoService saldoService;
    private final JwtUtil jwtUtil;

    public SaldoController(SaldoService saldoService, JwtUtil jwtUtil) {
        this.saldoService = saldoService;
        this.jwtUtil = jwtUtil;
    }

    //CONSULTAR MI SALDO ACTUAL DEL USUARIO LOGEADO
    @GetMapping
    public ResponseEntity<Double> obtenerSaldo(@RequestHeader("Authorization") String token) {
        Long usuarioId = jwtUtil.obtenerUsuarioIdDesdeToken(token);
        double saldo = saldoService.calcularSaldo(usuarioId);
        return ResponseEntity.ok(saldo);
    }
}
