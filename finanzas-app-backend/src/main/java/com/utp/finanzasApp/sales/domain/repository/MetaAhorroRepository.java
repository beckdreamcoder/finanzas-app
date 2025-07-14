package com.utp.finanzasApp.sales.domain.repository;

import com.utp.finanzasApp.sales.domain.model.MetaAhorro;

import java.util.List;
import java.util.Optional;

public interface MetaAhorroRepository {
    MetaAhorro guardar(MetaAhorro meta);
    Optional<MetaAhorro> obtenerPorId(Long metaId);
    List<MetaAhorro> obtenerPorUsuario(Long usuarioId);
    void eliminarPorId(Long metaId);
    boolean existePorId(Long metaId);
}
