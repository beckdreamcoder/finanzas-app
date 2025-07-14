package com.utp.finanzasApp.sales.infrastructure.entities;

import com.utp.finanzasApp.sales.domain.model.enums.FrecuenciaAhorro;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "meta_ahorro")
public class MetaAhorroEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "usuario_id")
    private Long usuarioId;

    @Column(name = "monto_actual")
    private Double montoActual;

    @Column(name = "monto_objetivo")
    private BigDecimal montoObjetivo;

    @Column(name = "fecha_limite")
    private LocalDate fechaLimite;

    @Column(name = "categoria")
    private String categoria;

    @Column(name = "descripcion", length = 500)
    private String descripcion;
    @Column(name = "frecuencia")
    private FrecuenciaAhorro frecuencia;
    @Column(name = "monto_periodo")
    private Double montoPeriodo;

    // Getters y setters
    public Double getMontoPeriodo() {
        return montoPeriodo;
    }

    public void setMontoPeriodo(Double montoPeriodo) {
        this.montoPeriodo = montoPeriodo;
    }
    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }
    public Double getMontoActual() {
        return montoActual;
    }

    public void setMontoActual(Double montoActual) {
        this.montoActual = montoActual;
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

    public FrecuenciaAhorro getFrecuencia() {
        return frecuencia;
    }

    public void setFrecuencia(FrecuenciaAhorro frecuencia) {
        this.frecuencia = frecuencia;
    }


}
