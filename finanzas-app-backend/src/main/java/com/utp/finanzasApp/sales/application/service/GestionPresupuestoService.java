package com.utp.finanzasApp.sales.application.service;

import com.utp.finanzasApp.sales.domain.model.Presupuesto;
import com.utp.finanzasApp.sales.domain.repository.PresupuestoRepository;
import com.utp.finanzasApp.sales.interfaces.dto.RegistrarPresupuestoDTO;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.YearMonth;
import java.util.Optional;

@Service
public class GestionPresupuestoService {
    private final PresupuestoRepository repository;

    public GestionPresupuestoService(PresupuestoRepository repository) {
        this.repository = repository;
    }

    public Presupuesto registrar(RegistrarPresupuestoDTO dto) {
        Presupuesto presupuesto = new Presupuesto();
        presupuesto.setUsuarioId(dto.getUsuarioId());
        presupuesto.setMonto(BigDecimal.valueOf(dto.getMonto()));
        presupuesto.setMes(YearMonth.parse(dto.getMes()));
        return repository.guardar(presupuesto);
    }

    public Optional<Presupuesto> consultar(Long usuarioId, String mes) {
        YearMonth yearMonth = YearMonth.parse(mes);
        int mesInt = yearMonth.getMonthValue();
        int anio = yearMonth.getYear();
        return repository.obtenerPorUsuarioYMes(usuarioId, mesInt, anio);
    }
}
