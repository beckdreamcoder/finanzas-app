package com.utp.finanzasApp.sales.infrastructure.repository;

import com.utp.finanzasApp.sales.infrastructure.entities.PresupuestoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JpaPresupuestoRepository extends JpaRepository<PresupuestoEntity, Long> {

    Optional<PresupuestoEntity> findByUsuarioIdAndMesAndAnio(Long usuarioId, int mes, int anio);

}
