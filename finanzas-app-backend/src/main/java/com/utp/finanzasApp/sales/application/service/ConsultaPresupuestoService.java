package com.utp.finanzasApp.sales.application.service;

import com.utp.finanzasApp.sales.domain.model.Presupuesto;
import com.utp.finanzasApp.sales.domain.repository.PresupuestoRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ConsultaPresupuestoService {

    private final PresupuestoRepository presupuestoRepository;

    public ConsultaPresupuestoService(PresupuestoRepository presupuestoRepository) {
        this.presupuestoRepository = presupuestoRepository;
    }

    public Presupuesto obtenerPorUsuarioYMes(Long usuarioId, int mes, int anio) {
        Optional<Presupuesto> presupuesto = presupuestoRepository.obtenerPorUsuarioYMes(usuarioId, mes, anio);
        return presupuesto.orElseThrow(() ->
                new RuntimeException("Presupuesto no encontrado para el usuario " + usuarioId +
                        " en el mes " + mes + " y año " + anio));
    }
}
