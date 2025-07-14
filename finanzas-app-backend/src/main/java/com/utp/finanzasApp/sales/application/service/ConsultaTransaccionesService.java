// application/service/ConsultaTransaccionesService.java
package com.utp.finanzasApp.sales.application.service;

import com.utp.finanzasApp.sales.domain.model.Transaccion;
import com.utp.finanzasApp.sales.domain.repository.TransaccionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConsultaTransaccionesService {

    private final TransaccionRepository transaccionRepository;

    public ConsultaTransaccionesService(TransaccionRepository transaccionRepository) {
        this.transaccionRepository = transaccionRepository;
    }

    public List<Transaccion> obtenerPorUsuario(Long usuarioId) {
        return transaccionRepository.obtenerPorUsuario(usuarioId);
    }

    public Transaccion obtenerPorId(Long id) {
        return transaccionRepository.obtenerPorId(id)
                .orElseThrow(() -> new IllegalArgumentException("Transacción no encontrada con ID: " + id));
    }

    public void eliminar(Long id) {
        transaccionRepository.eliminarPorId(id);
    }

}
