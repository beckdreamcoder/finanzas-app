package com.utp.finanzasApp.sales.interfaces.dto;

public class RegistrarUsuarioDTO {

    private String nombre;
    private String email;
    private String password;

    // ✅ Constructor vacío requerido por Spring
    public RegistrarUsuarioDTO() {
    }

    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
}
