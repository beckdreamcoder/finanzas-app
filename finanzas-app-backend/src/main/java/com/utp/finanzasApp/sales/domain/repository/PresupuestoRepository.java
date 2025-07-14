package com.utp.finanzasApp.sales.domain.repository;

import com.utp.finanzasApp.sales.domain.model.Presupuesto;

import java.time.YearMonth;
import java.util.Optional;

public interface PresupuestoRepository {
    Presupuesto guardar(Presupuesto presupuesto);
    Optional<Presupuesto> obtenerPorUsuarioYMes(Long usuarioId, int mes, int anio);
    Optional<Presupuesto> obtenerPorId(Long id);
    Presupuesto actualizar(Presupuesto presupuesto);
}
