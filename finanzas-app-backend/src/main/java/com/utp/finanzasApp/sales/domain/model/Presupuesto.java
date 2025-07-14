package com.utp.finanzasApp.sales.domain.model;

import java.math.BigDecimal;
import java.time.YearMonth;

public class Presupuesto {
    private Long id;

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

    public BigDecimal getMonto() {
        return monto;
    }

    public void setMonto(BigDecimal monto) {
        this.monto = monto;
    }

    public YearMonth getMes() {
        return mes;
    }

    public void setMes(YearMonth mes) {
        this.mes = mes;
    }

    private Long usuarioId;
    private BigDecimal monto;
    private YearMonth mes;

    // Constructor, getters y setters
}
