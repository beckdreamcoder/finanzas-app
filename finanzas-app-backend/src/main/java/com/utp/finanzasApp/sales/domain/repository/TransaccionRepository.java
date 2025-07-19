package com.utp.finanzasApp.sales.domain.repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.utp.finanzasApp.sales.domain.model.Transaccion;
import com.utp.finanzasApp.sales.domain.model.enums.TipoTransaccion;
import com.utp.finanzasApp.sales.infrastructure.entities.TransaccionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TransaccionRepository {
    Transaccion guardar(Transaccion transaccion);
    List<Transaccion> obtenerPorUsuario(Long usuarioId);
    Optional<Transaccion> obtenerPorId(Long id); // ✅ ahora compila
    List<TransaccionEntity> findByUsuarioIdAndTipo(Long usuarioId, TipoTransaccion tipo);
    void eliminarPorId(Long id);

}
