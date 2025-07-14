package com.utp.finanzasApp.sales.domain.model;

import com.utp.finanzasApp.sales.domain.model.enums.TipoTransaccion;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class Transaccion {
    private Long id;
    private String descripcion;
    private double monto;
    private LocalDateTime fecha;
    private TipoTransaccion tipo;
    private Long usuarioId;

    public Long getMetaAhorroId() {
        return metaAhorroId;
    }

    public void setMetaAhorroId(Long metaAhorroId) {
        this.metaAhorroId = metaAhorroId;
    }

    private Long metaAhorroId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public double getMonto() {
        return monto;
    }

    public void setMonto(double monto) {
        this.monto = monto;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }

    public TipoTransaccion getTipo() {
        return tipo;
    }

    public void setTipo(TipoTransaccion tipo) {
        this.tipo = tipo;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }
}
