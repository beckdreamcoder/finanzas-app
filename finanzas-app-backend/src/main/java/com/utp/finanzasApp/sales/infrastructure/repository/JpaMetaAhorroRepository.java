package com.utp.finanzasApp.sales.infrastructure.repository;

import com.utp.finanzasApp.sales.infrastructure.entities.MetaAhorroEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository  // ✅ Esta es la anotación que necesitas
public interface JpaMetaAhorroRepository extends JpaRepository<MetaAhorroEntity, Long> {
    List<MetaAhorroEntity> findAllByUsuarioId(Long usuarioId);
    void deleteByUsuarioId(Long usuarioId);
}
