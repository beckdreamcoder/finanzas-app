package com.utp.finanzasApp.sales.interfaces.controller;

import com.utp.finanzasApp.sales.application.service.LoginUsuarioService;
import com.utp.finanzasApp.sales.application.service.RegistroUsuarioService;
import com.utp.finanzasApp.sales.domain.model.Usuario;
import com.utp.finanzasApp.sales.interfaces.dto.LoginRequestDTO;
import com.utp.finanzasApp.sales.interfaces.dto.LoginResponseDTO;
import com.utp.finanzasApp.sales.interfaces.dto.RegistrarUsuarioDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    // Logger para monitoreo del servicio TI — registra eventos de autenticación
    private static final Logger log = LoggerFactory.getLogger(UsuarioController.class);

    private final LoginUsuarioService loginUsuarioService;
    private final RegistroUsuarioService registroUsuarioService;

    public UsuarioController(
            LoginUsuarioService loginUsuarioService,
            RegistroUsuarioService registroUsuarioService
    ) {
        this.loginUsuarioService = loginUsuarioService;
        this.registroUsuarioService = registroUsuarioService;
    }

    //LOGEO DEL USUARIO REGISTRADO: CAMPOS{EMAIL, PASSWORD}
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO dto) {
        try {
            log.info("[LOGIN] Intento de inicio de sesión para el correo: {}", dto.getEmail());
            LoginResponseDTO response = loginUsuarioService.login(dto);
            log.info("[LOGIN] Inicio de sesión exitoso para el usuario ID: {}", response.getId());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.warn("[LOGIN] Intento de inicio de sesión fallido para el correo: {} — Razón: {}", dto.getEmail(), e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Correo o contraseña incorrectos");
        }
    }

    //REGISTRAR UN NUEVO USUARIO: CAMPOS {NOMBRE, EMAIL, PASSWORD}
    @PostMapping("/registrar")
    public ResponseEntity<?> registrar(@RequestBody RegistrarUsuarioDTO dto) {
        try {
            log.info("[REGISTRO] Nuevo registro de usuario — Correo: {}", dto.getEmail());
            Usuario nuevo = registroUsuarioService.registrar(dto);
            log.info("[REGISTRO] Usuario creado exitosamente — ID: {}, Nombre: {}", nuevo.getId(), nuevo.getNombre());
            return ResponseEntity.ok(nuevo);
        } catch (Exception e) {
            log.error("[REGISTRO] Error al registrar usuario con correo: {} — Error: {}", dto.getEmail(), e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al registrar: " + e.getMessage());
        }
    }
}
