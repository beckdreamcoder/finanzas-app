package com.utp.finanzasApp.sales.infrastructure.mapper;

import com.utp.finanzasApp.sales.domain.model.Transaccion;
import com.utp.finanzasApp.sales.infrastructure.entities.TransaccionEntity;
import org.springframework.stereotype.Component;

@Component
public class TransaccionMapper {

    public TransaccionEntity toEntity(Transaccion model) {
        TransaccionEntity entity = new TransaccionEntity();
        entity.setId(model.getId());
        entity.setDescripcion(model.getDescripcion());
        entity.setMonto(model.getMonto());
        entity.setFecha(model.getFecha());
        entity.setTipo(model.getTipo());
        entity.setUsuarioId(model.getUsuarioId());
        entity.setMetaAhorroId(model.getMetaAhorroId()); // ✅ nuevo
        return entity;
    }

    public Transaccion toDomain(TransaccionEntity entity) {
        Transaccion model = new Transaccion();
        model.setId(entity.getId());
        model.setDescripcion(entity.getDescripcion());
        model.setMonto(entity.getMonto());
        model.setFecha(entity.getFecha());
        model.setTipo(entity.getTipo());
        model.setUsuarioId(entity.getUsuarioId());
        model.setMetaAhorroId(entity.getMetaAhorroId()); // ✅ nuevo
        return model;
    }
}
