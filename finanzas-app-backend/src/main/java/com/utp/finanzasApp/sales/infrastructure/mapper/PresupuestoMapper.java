package com.utp.finanzasApp.sales.infrastructure.mapper;

import com.utp.finanzasApp.sales.domain.model.Presupuesto;
import com.utp.finanzasApp.sales.infrastructure.entities.PresupuestoEntity;
import org.springframework.stereotype.Component;

import java.time.YearMonth;

@Component
public class PresupuestoMapper {

    public Presupuesto aDominio(PresupuestoEntity entity) {
        Presupuesto presupuesto = new Presupuesto();
        presupuesto.setId(entity.getId());
        presupuesto.setUsuarioId(entity.getUsuarioId());
        presupuesto.setMes(YearMonth.of(entity.getAnio(), entity.getMes()));
        presupuesto.setMonto(entity.getMonto());
        return presupuesto;
    }

    public PresupuestoEntity aEntidad(Presupuesto domain) {
        PresupuestoEntity entity = new PresupuestoEntity();
        entity.setId(domain.getId());
        entity.setUsuarioId(domain.getUsuarioId());
        entity.setMes(domain.getMes().getMonthValue());
        entity.setAnio(domain.getMes().getYear());
        entity.setMonto(domain.getMonto());
        return entity;
    }
}
