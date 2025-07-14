package com.utp.finanzasApp.sales.interfaces.dto;

public class RegistrarPresupuestoDTO {
    private Long usuarioId;

    public String getMes() {
        return mes;
    }

    public void setMes(String mes) {
        this.mes = mes;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public double getMonto() {
        return monto;
    }

    public void setMonto(double monto) {
        this.monto = monto;
    }

    private String mes; // formato "2025-07"
    private double monto;

    // Getters y setters
}
