package com.utp.finanzasApp.sales.infrastructure.repository;

import com.utp.finanzasApp.sales.domain.model.Transaccion;
import com.utp.finanzasApp.sales.domain.model.enums.TipoTransaccion;
import com.utp.finanzasApp.sales.domain.repository.TransaccionRepository;
import com.utp.finanzasApp.sales.infrastructure.entities.TransaccionEntity;
import com.utp.finanzasApp.sales.infrastructure.mapper.TransaccionMapper;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class TransaccionRepositoryImpl implements TransaccionRepository {
    private final JpaTransaccionRepository jpaRepository;
    private final TransaccionMapper mapper;

    public TransaccionRepositoryImpl(JpaTransaccionRepository jpaRepository, TransaccionMapper mapper) {
        this.jpaRepository = jpaRepository;
        this.mapper = mapper;
    }

    @Override
    public Transaccion guardar(Transaccion transaccion) {
        TransaccionEntity entity = mapper.toEntity(transaccion);
        TransaccionEntity guardado = jpaRepository.save(entity);
        return mapper.toDomain(guardado);
    }

    @Override
    public List<Transaccion> obtenerPorUsuario(Long usuarioId) {
        return jpaRepository.findByUsuarioId(usuarioId).stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Transaccion> obtenerPorId(Long id) {
        return jpaRepository.findById(id)
                .map(mapper::toDomain);  //MÉTODO PARA IDENTIFICAR LAS METAS DE CADA USUARIO
    }

    @Override
    public List<TransaccionEntity> findByUsuarioIdAndTipo(Long usuarioId, TipoTransaccion tipo) {
        return jpaRepository.findByUsuarioIdAndTipo(usuarioId, tipo);
    }

    @Override
    public void eliminarPorId(Long id) {
        jpaRepository.deleteById(id);  // Este método también debe estar implementado
    }


}

