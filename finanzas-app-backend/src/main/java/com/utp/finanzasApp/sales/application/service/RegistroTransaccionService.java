package com.utp.finanzasApp.sales.application.service;

import com.utp.finanzasApp.sales.domain.model.MetaAhorro;
import com.utp.finanzasApp.sales.domain.model.Transaccion;
import com.utp.finanzasApp.sales.domain.repository.MetaAhorroRepository;
import com.utp.finanzasApp.sales.domain.repository.TransaccionRepository;
import com.utp.finanzasApp.sales.interfaces.dto.ActualizarTransaccionDTO;
import com.utp.finanzasApp.sales.interfaces.dto.RegistrarTransaccionDTO;
import org.springframework.stereotype.Service;
import com.utp.finanzasApp.sales.domain.model.enums.TipoTransaccion;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class RegistroTransaccionService {

    private final TransaccionRepository transaccionRepository;
    private final MetaAhorroRepository metaAhorroRepository;

    public RegistroTransaccionService(TransaccionRepository transaccionRepository, MetaAhorroRepository metaAhorroRepository) {
        this.transaccionRepository = transaccionRepository;
        this.metaAhorroRepository = metaAhorroRepository;
    }

    public Transaccion registrar(Long usuarioId, RegistrarTransaccionDTO dto) {
        String tipoStr = String.valueOf(dto.getTipo());
        if (tipoStr.trim().isEmpty()) {
            throw new IllegalArgumentException("El tipo de transacción no puede ser nulo o vacío");
        }

        TipoTransaccion tipo;
        try {
            tipo = TipoTransaccion.valueOf(tipoStr.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Tipo de transacción inválido: " + tipoStr);
        }

        Transaccion transaccion = new Transaccion();
        transaccion.setUsuarioId(usuarioId); // ← ¡CORRECTO!
        transaccion.setMonto(dto.getMonto());
        transaccion.setDescripcion(dto.getDescripcion());
        transaccion.setTipo(tipo);
        transaccion.setFecha(LocalDateTime.now()); // O dto.getFecha() si quieres fecha manual

        return transaccionRepository.guardar(transaccion);
    }


    // En RegistroTransaccionService.java
    public Transaccion actualizar(Long id, ActualizarTransaccionDTO dto) {
        Transaccion transaccionExistente = transaccionRepository.obtenerPorId(id)
                .orElseThrow(() -> new RuntimeException("Transacción no encontrada"));

        transaccionExistente.setDescripcion(dto.getDescripcion());
        transaccionExistente.setMonto(dto.getMonto());

        // ✅ Usamos la fecha del DTO, pero la hora actual
        LocalDate fecha = LocalDate.parse(dto.getFecha());
        transaccionExistente.setFecha(fecha.atTime(LocalTime.now())); // ← esto combina la fecha del DTO con la hora actual

        transaccionExistente.setTipo(TipoTransaccion.valueOf(dto.getTipo().toUpperCase()));

        return transaccionRepository.guardar(transaccionExistente);
    }



    private double obtenerSaldo(Long usuarioId) {
        return transaccionRepository.obtenerPorUsuario(usuarioId).stream()
                .mapToDouble(t -> t.getTipo() == TipoTransaccion.INGRESO ? t.getMonto() : -t.getMonto())
                .sum();
    }
    private void registrarTransaccion(Long usuarioId, double monto, TipoTransaccion tipo, String descripcion) {
        Transaccion transaccion = new Transaccion();
        transaccion.setUsuarioId(usuarioId);
        transaccion.setMonto(monto);
        transaccion.setTipo(tipo);
        transaccion.setDescripcion(descripcion);
        transaccion.setFecha(LocalDateTime.now());

        transaccionRepository.guardar(transaccion);
    }

    public void eliminar(Long id) {
        transaccionRepository.eliminarPorId(id);
    }


}
