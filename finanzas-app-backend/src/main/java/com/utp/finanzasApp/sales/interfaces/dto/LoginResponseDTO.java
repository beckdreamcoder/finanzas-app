package com.utp.finanzasApp.sales.interfaces.dto;

public class LoginResponseDTO {
    private Long id;
    private String nombre;
    private String email;
    private String token;

    public LoginResponseDTO(Long id, String nombre, String email, String token) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.token = token;
    }

    public Long getId() { return id; }
    public String getNombre() { return nombre; }
    public String getEmail() { return email; }
    public String getToken() { return token; }
}
