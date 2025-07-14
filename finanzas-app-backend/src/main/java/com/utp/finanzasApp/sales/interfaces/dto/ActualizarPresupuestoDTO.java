package com.utp.finanzasApp.sales.interfaces.dto;

import java.math.BigDecimal;
import lombok.Data;

@Data
public class ActualizarPresupuestoDTO {
    private Long id;
    private BigDecimal monto;
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getMonto() {
        return monto;
    }

    public void setMonto(BigDecimal monto) {
        this.monto = monto;
    }
}