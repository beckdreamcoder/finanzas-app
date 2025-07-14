package com.utp.finanzasApp.sales.interfaces.dto;

import com.utp.finanzasApp.sales.domain.model.enums.TipoTransaccion;
import java.time.LocalDate;

public class RegistrarTransaccionDTO {

    private String descripcion;
    private Double monto;
    private LocalDate fecha;
    private TipoTransaccion tipo;

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Double getMonto() {
        return monto;
    }

    public void setMonto(Double monto) {
        this.monto = monto;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public TipoTransaccion getTipo() {
        return tipo;
    }

    public void setTipo(TipoTransaccion tipo) {
        this.tipo = tipo;
    }

}
