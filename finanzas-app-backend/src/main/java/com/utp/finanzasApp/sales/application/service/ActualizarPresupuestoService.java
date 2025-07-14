package com.utp.finanzasApp.sales.application.service;

import com.utp.finanzasApp.sales.domain.model.Presupuesto;
import com.utp.finanzasApp.sales.domain.repository.PresupuestoRepository;
import com.utp.finanzasApp.sales.interfaces.dto.ActualizarPresupuestoDTO;
import org.springframework.stereotype.Service;

@Service
public class ActualizarPresupuestoService {

    private final PresupuestoRepository repository;

    public ActualizarPresupuestoService(PresupuestoRepository repository) {
        this.repository = repository;
    }

    public Presupuesto actualizar(ActualizarPresupuestoDTO dto) {
        // Busca el presupuesto por ID
        Presupuesto presupuesto = repository.obtenerPorId(dto.getId())
                .orElseThrow(() -> new RuntimeException("Presupuesto no encontrado con ID: " + dto.getId()));

        // Actualiza el monto
        presupuesto.setMonto(dto.getMonto());

        // Guarda los cambios
        return repository.actualizar(presupuesto);
    }
}
