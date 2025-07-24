package com.utp.finanzasApp.sales.application.service;

import com.utp.finanzasApp.sales.domain.model.Usuario;
import com.utp.finanzasApp.sales.domain.repository.TransaccionRepository;
import com.utp.finanzasApp.sales.domain.repository.UsuarioRepository;
import com.utp.finanzasApp.sales.interfaces.dto.MovimientoDTO;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReporteFinancieroService {

    private final TransaccionRepository transaccionRepository;
    private final UsuarioRepository usuarioRepository;
    private SaldoService saldoService;

    public ReporteFinancieroService(TransaccionRepository transaccionRepository, UsuarioRepository usuarioRepository, SaldoService saldoService) {
        this.transaccionRepository = transaccionRepository;
        this.usuarioRepository = usuarioRepository;
        this.saldoService = saldoService;
    }

    public List<MovimientoDTO> obtenerMovimientosUsuario(Long usuarioId, LocalDateTime desde, LocalDateTime hasta) {
        if (desde != null && hasta != null && desde.toLocalDate().equals(hasta.toLocalDate())) {
            desde = desde.toLocalDate().atStartOfDay();
            hasta = desde.toLocalDate().atTime(23, 59, 59, 999_000_000);
        }

        final LocalDateTime finalDesde = desde;
        final LocalDateTime finalHasta = hasta;

        return transaccionRepository.obtenerPorUsuario(usuarioId).stream()
                .filter(transaccion -> {
                    LocalDateTime fecha = transaccion.getFecha();
                    return (finalDesde == null || !fecha.isBefore(finalDesde)) &&
                            (finalHasta == null || !fecha.isAfter(finalHasta));
                })
                .map(transaccion -> {
                    MovimientoDTO dto = new MovimientoDTO();
                    dto.setFecha(transaccion.getFecha());
                    dto.setTipo(transaccion.getTipo().name());
                    dto.setMonto(transaccion.getMonto());
                    dto.setDescripcion(transaccion.getDescripcion());
                    return dto;
                })
                .collect(Collectors.toList());
    }


    public Usuario obtenerDatosUsuario(Long usuarioId) {
        return usuarioRepository.buscarPorId(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + usuarioId));
    }
    public double obtenerSaldoActualUsuario(Long usuarioId) {
        return saldoService.calcularSaldo(usuarioId);
    }

}