package com.utp.finanzasApp.sales.domain.model;

import com.utp.finanzasApp.sales.domain.model.enums.FrecuenciaAhorro;

import java.math.BigDecimal;
import java.time.LocalDate;

public class MetaAhorro {

    private Long id;
    private Long usuarioId;
    private BigDecimal montoObjetivo;
    private Double montoActual;
    private LocalDate fechaLimite;
    private String categoria;
    private String descripcion;
    private FrecuenciaAhorro frecuencia; // NUEVO ENUM
    private Double montoPeriodo;

    public FrecuenciaAhorro getFrecuencia() {
        return frecuencia;
    }

    public void setFrecuencia(FrecuenciaAhorro frecuencia) {
        this.frecuencia = frecuencia;
    }

    public Double getMontoPeriodo() {
        return montoPeriodo;
    }

    public void setMontoPeriodo(Double montoPeriodo) {
        this.montoPeriodo = montoPeriodo;
    }



    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }



    public Double getMontoActual() {
        return montoActual;
    }

    public void setMontoActual(Double montoActual) {
        this.montoActual = montoActual;
    }


    public BigDecimal getMontoObjetivo() {
        return montoObjetivo;
    }

    public void setMontoObjetivo(BigDecimal montoObjetivo) {
        this.montoObjetivo = montoObjetivo;
    }


    public LocalDate getFechaLimite() {
        return fechaLimite;
    }

    public void setFechaLimite(LocalDate fechaLimite) {
        this.fechaLimite = fechaLimite;
    }
}
