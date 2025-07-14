package com.utp.finanzasApp.sales.domain.repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.utp.finanzasApp.sales.domain.model.Transaccion;
import org.springframework.data.jpa.repository.Query;

public interface TransaccionRepository {
    Transaccion guardar(Transaccion transaccion);
    List<Transaccion> obtenerPorUsuario(Long usuarioId);
    Optional<Transaccion> obtenerPorId(Long id); // ✅ ahora compila
    void eliminarPorId(Long id);

}
