package com.utp.finanzasApp.sales.application.service;

import com.utp.finanzasApp.sales.domain.model.Usuario;
import com.utp.finanzasApp.sales.domain.repository.UsuarioRepository;
import com.utp.finanzasApp.sales.interfaces.dto.RegistrarUsuarioDTO;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RegistroUsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public RegistroUsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Usuario registrar(RegistrarUsuarioDTO dto) {
        Usuario nuevo = new Usuario();
        nuevo.setNombre(dto.getNombre());
        nuevo.setEmail(dto.getEmail());
        nuevo.setPassword(passwordEncoder.encode(dto.getPassword()));
        return usuarioRepository.guardar(nuevo);
    }
}

