package com.utp.finanzasApp.sales.infrastructure.mapper;

import com.utp.finanzasApp.sales.domain.model.MetaAhorro;
import com.utp.finanzasApp.sales.infrastructure.entities.MetaAhorroEntity; // ✅ Falta esta importación
import org.springframework.stereotype.Component;

@Component
public class MetaAhorroMapper {

    public MetaAhorro toDomain(MetaAhorroEntity entity) {
        MetaAhorro meta = new MetaAhorro();
        meta.setId(entity.getId());
        meta.setUsuarioId(entity.getUsuarioId());
        meta.setMontoObjetivo(entity.getMontoObjetivo());
        meta.setMontoActual(entity.getMontoActual());
        meta.setFechaLimite(entity.getFechaLimite());
        meta.setCategoria(entity.getCategoria());
        meta.setDescripcion(entity.getDescripcion());
        meta.setFrecuencia(entity.getFrecuencia());
        meta.setMontoPeriodo(entity.getMontoPeriodo());
        return meta;
    }

    public MetaAhorroEntity toEntity(MetaAhorro meta) {
        MetaAhorroEntity entity = new MetaAhorroEntity();
        entity.setId(meta.getId());
        entity.setUsuarioId(meta.getUsuarioId());
        entity.setMontoObjetivo(meta.getMontoObjetivo());
        entity.setMontoActual(meta.getMontoActual());
        entity.setFechaLimite(meta.getFechaLimite());
        entity.setCategoria(meta.getCategoria());
        entity.setDescripcion(meta.getDescripcion());
        entity.setFrecuencia(meta.getFrecuencia());
        entity.setMontoPeriodo(meta.getMontoPeriodo());
        return entity;
    }
}

