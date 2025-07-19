package com.utp.finanzasApp.sales.application.service;

import com.utp.finanzasApp.sales.domain.repository.TransaccionRepository;
import com.utp.finanzasApp.sales.domain.model.enums.TipoTransaccion;
import com.utp.finanzasApp.sales.infrastructure.entities.TransaccionEntity;
import org.springframework.stereotype.Service;

@Service
public class SaldoService {

    private final TransaccionRepository transaccionRepository;

    public SaldoService(TransaccionRepository transaccionRepository) {
        this.transaccionRepository = transaccionRepository;
    }

    public double calcularSaldo(Long usuarioId) {
        return transaccionRepository.obtenerPorUsuario(usuarioId).stream()
                .mapToDouble(t -> t.getTipo() == TipoTransaccion.INGRESO
                        ? t.getMonto()
                        : -t.getMonto())
                .sum();
    }

    // SaldoService.java
    public double obtenerTotalIngresos(Long usuarioId) {
        return transaccionRepository.findByUsuarioIdAndTipo(usuarioId, TipoTransaccion.INGRESO)
                .stream()
                .mapToDouble(TransaccionEntity::getMonto)
                .sum();
    }

    public double obtenerTotalGastos(Long usuarioId) {
        return transaccionRepository.findByUsuarioIdAndTipo(usuarioId, TipoTransaccion.GASTO)
                .stream()
                .mapToDouble(TransaccionEntity::getMonto)
                .sum();
    }

}
