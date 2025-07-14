package com.utp.finanzasApp.sales.infrastructure.entities;

import com.utp.finanzasApp.sales.domain.model.enums.TipoTransaccion;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "transacciones")
public class TransaccionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String descripcion;

    private double monto;

    private LocalDateTime fecha;

    @Enumerated(EnumType.STRING)
    private TipoTransaccion tipo;

    @Column(name = "usuario_id")
    private Long usuarioId;

    @Column(name = "meta_ahorro_id", nullable = true) // ✅ NUEVO CAMPO OPCIONAL
    private Long metaAhorroId;

    // Constructores
    public TransaccionEntity() {}

    public TransaccionEntity(Long id, String descripcion, double monto, LocalDateTime fecha, TipoTransaccion tipo, Long usuarioId, Long metaAhorroId) {
        this.id = id;
        this.descripcion = descripcion;
        this.monto = monto;
        this.fecha = fecha;
        this.tipo = tipo;
        this.usuarioId = usuarioId;
        this.metaAhorroId = metaAhorroId;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public double getMonto() { return monto; }
    public void setMonto(double monto) { this.monto = monto; }

    public LocalDateTime getFecha() { return fecha; }
    public void setFecha(LocalDateTime fecha) { this.fecha = fecha; }

    public TipoTransaccion getTipo() { return tipo; }
    public void setTipo(TipoTransaccion tipo) { this.tipo = tipo; }

    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }

    public Long getMetaAhorroId() { return metaAhorroId; }
    public void setMetaAhorroId(Long metaAhorroId) { this.metaAhorroId = metaAhorroId; }
}

