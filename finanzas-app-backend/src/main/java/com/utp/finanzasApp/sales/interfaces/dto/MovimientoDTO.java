package com.utp.finanzasApp.sales.interfaces.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class MovimientoDTO {
    private LocalDateTime fecha;
    private String tipo; // INGRESO o GASTO
    private double monto;
    private String descripcion;

    //getters and setters
    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }

    public double getMonto() {
        return monto;
    }

    public void setMonto(double monto) {
        this.monto = monto;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }


}
