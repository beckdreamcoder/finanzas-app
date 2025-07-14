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
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class ConsultaMetaAhorroService {

    private final MetaAhorroRepository metaAhorroRepository;
    private final TransaccionRepository transaccionRepository;

    public ConsultaMetaAhorroService(MetaAhorroRepository metaAhorroRepository,
                                     TransaccionRepository transaccionRepository) {
        this.metaAhorroRepository = metaAhorroRepository;
        this.transaccionRepository = transaccionRepository;
    }

    public List<MetaAhorro> obtenerPorUsuario(Long usuarioId) {
        return metaAhorroRepository.obtenerPorUsuario(usuarioId);
    }

    // ✅ Agregado para que funcione eliminarMeta(...)
    public MetaAhorro obtenerPorId(Long metaId) {
        return metaAhorroRepository.obtenerPorId(metaId)
                .orElseThrow(() -> new RuntimeException("Meta no encontrada con ID: " + metaId));
    }
}
