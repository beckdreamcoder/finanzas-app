package com.utp.finanzasApp.sales.infrastructure.repository;

import com.utp.finanzasApp.sales.domain.model.enums.TipoTransaccion;
import com.utp.finanzasApp.sales.infrastructure.entities.TransaccionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface JpaTransaccionRepository extends JpaRepository<TransaccionEntity, Long> {

    // Método para buscar transacciones por ID de usuario
    List<TransaccionEntity> findByUsuarioId(Long usuarioId);

    List<TransaccionEntity> findByUsuarioIdAndTipo(Long usuarioId, TipoTransaccion tipo);

}
