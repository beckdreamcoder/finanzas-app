package com.utp.finanzasApp.sales.application.service;
import com.utp.finanzasApp.sales.domain.model.MetaAhorro;
import com.utp.finanzasApp.sales.domain.model.Transaccion;
import com.utp.finanzasApp.sales.domain.model.enums.TipoTransaccion;
import com.utp.finanzasApp.sales.domain.repository.MetaAhorroRepository;
import com.utp.finanzasApp.sales.domain.repository.TransaccionRepository;
import com.utp.finanzasApp.sales.interfaces.dto.ProgresoMetaDTO;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Service
public class GestionMetaAhorroService {

    private final MetaAhorroService metaAhorroService;
    private final MetaAhorroRepository metaAhorroRepository;
    private final TransaccionRepository transaccionRepository;

    public GestionMetaAhorroService(
            MetaAhorroService metaAhorroService,
            MetaAhorroRepository metaAhorroRepository,
            TransaccionRepository transaccionRepository
    ) {
        this.metaAhorroService = metaAhorroService;
        this.metaAhorroRepository = metaAhorroRepository;
        this.transaccionRepository = transaccionRepository;
    }

    public ProgresoMetaDTO calcularProgreso(Long metaId, Long usuarioId) {
        MetaAhorro meta = metaAhorroRepository.obtenerPorId(metaId)
                .orElseThrow(() -> new RuntimeException("Meta con ID " + metaId + " no encontrada."));

        if (!meta.getUsuarioId().equals(usuarioId)) {
            throw new RuntimeException("Acceso no autorizado a esta meta.");
        }

        BigDecimal montoAhorrado = transaccionRepository.obtenerPorUsuario(usuarioId).stream()
                .filter(t -> t.getTipo() == TipoTransaccion.GASTO)
                .filter(t -> t.getDescripcion() != null && t.getDescripcion().contains("Aporte a meta:"))
                .filter(t -> t.getDescripcion().contains(meta.getDescripcion()))
                .map(t -> BigDecimal.valueOf(t.getMonto()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal faltante = meta.getMontoObjetivo().subtract(montoAhorrado);
        double porcentaje = montoAhorrado
                .divide(meta.getMontoObjetivo(), 2, RoundingMode.HALF_UP)
                .multiply(BigDecimal.valueOf(100))
                .doubleValue();

        long diasRestantes = ChronoUnit.DAYS.between(LocalDate.now(), meta.getFechaLimite());
        BigDecimal aporteSugerido = diasRestantes > 0
                ? faltante.divide(BigDecimal.valueOf(diasRestantes), 2, RoundingMode.HALF_UP)
                : faltante;

        ProgresoMetaDTO dto = new ProgresoMetaDTO();
        dto.setMontoObjetivo(meta.getMontoObjetivo());
        dto.setMontoAhorrado(montoAhorrado);
        dto.setMontoFaltante(faltante);
        dto.setPorcentajeProgreso(porcentaje);
        dto.setCumplida(montoAhorrado.compareTo(meta.getMontoObjetivo()) >= 0);
        dto.setFechaLimite(meta.getFechaLimite());
        dto.setFechaActual(LocalDate.now());
        dto.setAporteSugerido(aporteSugerido);
        dto.setMensajeMotivacional(
                porcentaje >= 100 ? "¡Meta cumplida!" :
                        porcentaje >= 80 ? "¡Vas al 80%! Solo faltan S/" + faltante + ". ¡Sigue así!" :
                                porcentaje >= 50 ? "¡Buen trabajo! Ya superaste el 50%." :
                                        "¡No te desanimes! Aporta S/" + aporteSugerido + " hoy para mantener el ritmo."
        );

        return dto;
    }

    public void aportarAMeta(Long metaId, Long usuarioId, BigDecimal monto) {
        MetaAhorro meta = metaAhorroRepository.obtenerPorId(metaId)
                .orElseThrow(() -> new RuntimeException("Meta no encontrada"));

        if (!meta.getUsuarioId().equals(usuarioId)) {
            throw new RuntimeException("No tienes permiso para aportar a esta meta");
        }

        double montoActual = meta.getMontoActual() != null ? meta.getMontoActual() : 0.0;
        meta.setMontoActual(montoActual + monto.doubleValue());
        metaAhorroRepository.guardar(meta);

        Transaccion transaccion = new Transaccion();
        transaccion.setUsuarioId(usuarioId);
        transaccion.setTipo(TipoTransaccion.GASTO);
        transaccion.setFecha(LocalDateTime.now());
        transaccion.setDescripcion("Aporte a meta: " + meta.getDescripcion());
        transaccion.setMonto(monto.doubleValue());
        transaccion.setMetaAhorroId(meta.getId()); // 👈 IMPORTANTE


        transaccionRepository.guardar(transaccion);
    }

}
