package com.utp.finanzasApp.sales.infrastructure.repository;

import com.utp.finanzasApp.sales.domain.model.Usuario;
import com.utp.finanzasApp.sales.domain.repository.UsuarioRepository;
import com.utp.finanzasApp.sales.infrastructure.entities.UsuarioEntity;
import com.utp.finanzasApp.sales.infrastructure.mapper.UsuarioMapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface JpaUsuarioRepository extends JpaRepository<UsuarioEntity, Long>, UsuarioRepository {

    Optional<UsuarioEntity> findByEmail(String email);
    Optional<UsuarioEntity> findById(Long id); // <- método de JPA

    @Override
    default Optional<Usuario> buscarPorEmail(String email) {
        return findByEmail(email).map(UsuarioMapper::toDomain);
    }

    @Override
    default Usuario guardar(Usuario usuario) {
        UsuarioEntity entity = UsuarioMapper.toEntity(usuario);
        UsuarioEntity saved = save(entity);
        return UsuarioMapper.toDomain(saved);
    }

    @Override
    default Optional<Usuario> buscarPorId(Long id) {
        return findById(id).map(UsuarioMapper::toDomain);
    }
}
