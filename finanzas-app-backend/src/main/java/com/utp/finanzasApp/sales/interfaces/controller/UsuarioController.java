package com.utp.finanzasApp.sales.interfaces.controller;

import com.utp.finanzasApp.sales.application.service.LoginUsuarioService;
import com.utp.finanzasApp.sales.application.service.RegistroUsuarioService;
import com.utp.finanzasApp.sales.domain.model.Usuario;
import com.utp.finanzasApp.sales.interfaces.dto.LoginRequestDTO;
import com.utp.finanzasApp.sales.interfaces.dto.LoginResponseDTO;
import com.utp.finanzasApp.sales.interfaces.dto.RegistrarUsuarioDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

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
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO dto) {
        LoginResponseDTO response = loginUsuarioService.login(dto);
        return ResponseEntity.ok(response);
    }

    //REGISTRAR UN NUEVO USUARIO: CAMPOS {NOMBRE, EMAIL, PASSWORD}
    @PostMapping("/registrar")
    public ResponseEntity<Usuario> registrar(@RequestBody RegistrarUsuarioDTO dto) {
        Usuario nuevo = registroUsuarioService.registrar(dto); // ✅ Correcto
        return ResponseEntity.ok(nuevo);
    }
}
