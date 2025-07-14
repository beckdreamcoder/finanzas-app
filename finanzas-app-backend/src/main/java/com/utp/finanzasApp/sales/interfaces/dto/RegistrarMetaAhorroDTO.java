package com.utp.finanzasApp.sales.interfaces.dto;

import com.utp.finanzasApp.sales.domain.model.enums.FrecuenciaAhorro;

import java.math.BigDecimal;
import java.time.LocalDate;

public class RegistrarMetaAhorroDTO {

    private BigDecimal montoObjetivo;
    private LocalDate fechaLimite;
    private String categoria;
    private String descripcion;

    public FrecuenciaAhorro getFrecuencia() {
        return frecuencia;
    }

    public void setFrecuencia(FrecuenciaAhorro frecuencia) {
        this.frecuencia = frecuencia;
    }

    private FrecuenciaAhorro frecuencia;

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

    private Long id;

    // Constructor vacío (opcional pero recomendable para frameworks como Spring)
    public RegistrarMetaAhorroDTO() {
    }

    // Getters y Setters

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
