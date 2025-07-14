package com.utp.finanzasApp.sales.interfaces.dto;

public class ActualizarTransaccionDTO {
    private String descripcion;
    private Double monto;
    private String fecha; // en formato yyyy-MM-dd
    private String tipo;

    // Getters y setters
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public Double getMonto() { return monto; }
    public void setMonto(Double monto) { this.monto = monto; }

    public String getFecha() { return fecha; }
    public void setFecha(String fecha) { this.fecha = fecha; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }
}
