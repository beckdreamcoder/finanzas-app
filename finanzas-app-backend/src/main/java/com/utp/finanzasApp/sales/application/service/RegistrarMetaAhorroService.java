package com.utp.finanzasApp.sales.application.service;

import com.utp.finanzasApp.sales.domain.model.MetaAhorro;
import com.utp.finanzasApp.sales.domain.model.Transaccion;
import com.utp.finanzasApp.sales.domain.model.enums.FrecuenciaAhorro;
import com.utp.finanzasApp.sales.domain.model.enums.TipoTransaccion;
import com.utp.finanzasApp.sales.domain.repository.MetaAhorroRepository;
import com.utp.finanzasApp.sales.domain.repository.TransaccionRepository;
import com.utp.finanzasApp.sales.interfaces.dto.RegistrarMetaAhorroDTO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.NoSuchElementException;

import static com.utp.finanzasApp.sales.domain.model.enums.FrecuenciaAhorro.*;

@Service
public class RegistrarMetaAhorroService {

    private final MetaAhorroRepository metaAhorroRepository;
    private final ConsultaTransaccionesService consultaTransaccionesService;
    private final TransaccionRepository transaccionRepository;


    public RegistrarMetaAhorroService(MetaAhorroRepository metaAhorroRepository, ConsultaTransaccionesService consultaTransaccionesService, TransaccionRepository transaccionRepository) {
        this.metaAhorroRepository = metaAhorroRepository;
        this.consultaTransaccionesService = consultaTransaccionesService;
        this.transaccionRepository = transaccionRepository;
    }

    public MetaAhorro registrar(Long usuarioId, RegistrarMetaAhorroDTO dto) {
        if (dto.getMontoObjetivo() == null || dto.getFechaLimite() == null) {
            throw new IllegalArgumentException("Monto objetivo y fecha límite son obligatorios.");
        }
        MetaAhorro meta = new MetaAhorro();
        meta.setUsuarioId(usuarioId);
        meta.setMontoObjetivo(dto.getMontoObjetivo());
        meta.setFechaLimite(dto.getFechaLimite());
        meta.setMontoActual(0.0); // Inicializar
        meta.setCategoria(dto.getCategoria());
        meta.setDescripcion(dto.getDescripcion());
        meta.setFrecuencia(dto.getFrecuencia());
        meta.setMontoPeriodo(
                calcularMontoPeriodo(meta.getMontoObjetivo(), meta.getFechaLimite(), meta.getFrecuencia()));
        return metaAhorroRepository.guardar(meta);
    }

    public MetaAhorro actualizar(Long metaId, Long usuarioId, RegistrarMetaAhorroDTO dto) {
        MetaAhorro meta = metaAhorroRepository.obtenerPorId(metaId)
                .orElseThrow(() -> new NoSuchElementException("Meta no encontrada"));

        if (!meta.getUsuarioId().equals(usuarioId)) {
            throw new RuntimeException("No tienes permiso para actualizar esta meta");
        }

        meta.setDescripcion(dto.getDescripcion());
        meta.setMontoObjetivo(dto.getMontoObjetivo());
        meta.setFechaLimite(dto.getFechaLimite());
        meta.setCategoria(dto.getCategoria());
        meta.setCategoria(dto.getCategoria());
        meta.setFrecuencia(dto.getFrecuencia());

        // Recalcular montoPeriodo
        long dias = ChronoUnit.DAYS.between(LocalDate.now(), dto.getFechaLimite());
        double montoPeriodo = 0.0;

        if (dias > 0) {
            switch (dto.getFrecuencia()) {
                case DIARIO:
                    montoPeriodo = dto.getMontoObjetivo().doubleValue() / dias;
                    break;
                case SEMANAL:
                    montoPeriodo = dto.getMontoObjetivo().doubleValue() / (dias / 7.0);
                    break;
                case MENSUAL:
                    montoPeriodo = dto.getMontoObjetivo().doubleValue() / (dias / 30.0);
                    break;
            }
        }

        meta.setMontoPeriodo(montoPeriodo);

        // Guardar meta actualizada

        return metaAhorroRepository.guardar(meta);
    }



    private double calcularMontoPeriodo(BigDecimal montoObjetivo, LocalDate fechaLimite, FrecuenciaAhorro frecuencia) {
        long dias = ChronoUnit.DAYS.between(LocalDate.now(), fechaLimite);
        if (dias <= 0) return montoObjetivo.doubleValue();
        switch (frecuencia) {
            case DIARIO: return montoObjetivo.doubleValue() / dias;
            case SEMANAL: return montoObjetivo.doubleValue() / (dias / 7.0);
            case MENSUAL: return montoObjetivo.doubleValue() / (dias / 30.0);
            default: return montoObjetivo.doubleValue();
        }
    }

    @Transactional
    public void eliminarMetaPorId(Long metaId) {
        MetaAhorro meta = metaAhorroRepository.obtenerPorId(metaId)
                .orElseThrow(() -> new RuntimeException("La meta con ID " + metaId + " no existe."));

        Long usuarioId = meta.getUsuarioId();

        // Calcular el total aportado a esta meta
        BigDecimal montoAhorrado = consultaTransaccionesService.obtenerPorUsuario(usuarioId).stream()
                .filter(t -> t.getTipo() == TipoTransaccion.GASTO)
                .filter(t -> t.getDescripcion() != null)
                .filter(t -> t.getDescripcion().contains("Aporte a meta:"))
                .filter(t -> t.getMetaAhorroId() != null && t.getMetaAhorroId().equals(metaId))  // ✅ Corrección aquí
                .map(t -> BigDecimal.valueOf(t.getMonto()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Registrar devolución si hay monto aportado
        if (montoAhorrado.compareTo(BigDecimal.ZERO) > 0) {
            Transaccion devolucion = new Transaccion();
            devolucion.setUsuarioId(usuarioId);
            devolucion.setMonto(montoAhorrado.doubleValue());
            devolucion.setTipo(TipoTransaccion.INGRESO);
            devolucion.setDescripcion("DEVOLUCIÓN DE AHORRO: " + meta.getDescripcion());
            devolucion.setFecha(LocalDateTime.now());
            transaccionRepository.guardar(devolucion);
        }

        // Finalmente eliminar la meta
        metaAhorroRepository.eliminarPorId(metaId);
    }

}
