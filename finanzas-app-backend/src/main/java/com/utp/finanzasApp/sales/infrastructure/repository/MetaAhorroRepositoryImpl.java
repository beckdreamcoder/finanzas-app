package com.utp.finanzasApp.sales.infrastructure.repository;

import com.utp.finanzasApp.sales.domain.model.MetaAhorro;
import com.utp.finanzasApp.sales.domain.repository.MetaAhorroRepository;
import com.utp.finanzasApp.sales.infrastructure.mapper.MetaAhorroMapper;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public class MetaAhorroRepositoryImpl implements MetaAhorroRepository {

    private final JpaMetaAhorroRepository jpaRepository;
    private final MetaAhorroMapper mapper;

    public MetaAhorroRepositoryImpl(JpaMetaAhorroRepository jpaRepository, MetaAhorroMapper mapper) {
        this.jpaRepository = jpaRepository;
        this.mapper = mapper;
    }

    @Override
    public MetaAhorro guardar(MetaAhorro meta) {
        return mapper.toDomain(jpaRepository.save(mapper.toEntity(meta)));
    }

    @Override
    public Optional<MetaAhorro> obtenerPorId(Long metaId) {
        return jpaRepository.findById(metaId)
                .map(mapper::toDomain);
    }

    @Override
    public List<MetaAhorro> obtenerPorUsuario(Long usuarioId) {
        return jpaRepository.findAllByUsuarioId(usuarioId)
                .stream()
                .map(mapper::toDomain)
                .toList();
    }

    @Override
    @Transactional
    public void eliminarPorId(Long metaId) {
        jpaRepository.deleteById(metaId);
    }

    @Override
    public boolean existePorId(Long id) {
        return jpaRepository.existsById(id);
    }
}
