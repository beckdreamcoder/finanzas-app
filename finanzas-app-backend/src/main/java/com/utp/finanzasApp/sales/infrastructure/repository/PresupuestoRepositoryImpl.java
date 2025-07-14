package com.utp.finanzasApp.sales.infrastructure.repository;

import com.utp.finanzasApp.sales.domain.model.Presupuesto;
import com.utp.finanzasApp.sales.domain.repository.PresupuestoRepository;
import com.utp.finanzasApp.sales.infrastructure.entities.PresupuestoEntity;
import com.utp.finanzasApp.sales.infrastructure.mapper.PresupuestoMapper;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class PresupuestoRepositoryImpl implements PresupuestoRepository {

    private final JpaPresupuestoRepository jpaPresupuestoRepository;
    private final PresupuestoMapper mapper;

    public PresupuestoRepositoryImpl(JpaPresupuestoRepository jpaPresupuestoRepository, PresupuestoMapper mapper) {
        this.jpaPresupuestoRepository = jpaPresupuestoRepository;
        this.mapper = mapper;
    }

    @Override
    public Presupuesto guardar(Presupuesto presupuesto) {
        PresupuestoEntity entity = jpaPresupuestoRepository.save(mapper.aEntidad(presupuesto));
        return mapper.aDominio(entity);
    }

    @Override
    public Optional<Presupuesto> obtenerPorUsuarioYMes(Long usuarioId, int mes, int anio) {
        return jpaPresupuestoRepository
                .findByUsuarioIdAndMesAndAnio(usuarioId, mes, anio)
                .map(mapper::aDominio);
    }

    @Override
    public Presupuesto actualizar(Presupuesto presupuesto) {
        PresupuestoEntity entity = jpaPresupuestoRepository.save(mapper.aEntidad(presupuesto));
        return mapper.aDominio(entity);
    }
    @Override
    public Optional<Presupuesto> obtenerPorId(Long id) {
        return jpaPresupuestoRepository.findById(id)
                .map(mapper::aDominio);
    }
}
