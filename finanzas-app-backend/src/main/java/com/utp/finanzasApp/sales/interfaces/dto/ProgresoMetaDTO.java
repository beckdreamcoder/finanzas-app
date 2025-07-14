package com.utp.finanzasApp.sales.interfaces.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class ProgresoMetaDTO {
    private BigDecimal montoObjetivo;
    private BigDecimal montoAhorrado;
    private BigDecimal montoFaltante;
    private double porcentajeProgreso;
    private boolean cumplida;
    private String mensajeMotivacional;
    private LocalDate fechaLimite;
    private LocalDate fechaActual;
    private BigDecimal aporteSugerido;

    public double getPorcentajeProgreso() {
        return porcentajeProgreso;
    }

    public void setPorcentajeProgreso(double porcentajeProgreso) {
        this.porcentajeProgreso = porcentajeProgreso;
    }

    public String getMensajeMotivacional() {
        return mensajeMotivacional;
    }

    public void setMensajeMotivacional(String mensajeMotivacional) {
        this.mensajeMotivacional = mensajeMotivacional;
    }

    public BigDecimal getAporteSugerido() {
        return aporteSugerido;
    }

    public void setAporteSugerido(BigDecimal aporteSugerido) {
        this.aporteSugerido = aporteSugerido;
    }

    // Getters y setters
    public BigDecimal getMontoObjetivo() { return montoObjetivo; }
    public void setMontoObjetivo(BigDecimal montoObjetivo) { this.montoObjetivo = montoObjetivo; }

    public BigDecimal getMontoAhorrado() { return montoAhorrado; }
    public void setMontoAhorrado(BigDecimal montoAhorrado) { this.montoAhorrado = montoAhorrado; }

    public BigDecimal getMontoFaltante() { return montoFaltante; }
    public void setMontoFaltante(BigDecimal montoFaltante) { this.montoFaltante = montoFaltante; }

    public boolean isCumplida() { return cumplida; }
    public void setCumplida(boolean cumplida) { this.cumplida = cumplida; }

    public LocalDate getFechaLimite() { return fechaLimite; }
    public void setFechaLimite(LocalDate fechaLimite) { this.fechaLimite = fechaLimite; }

    public LocalDate getFechaActual() { return fechaActual; }
    public void setFechaActual(LocalDate fechaActual) { this.fechaActual = fechaActual; }
}
