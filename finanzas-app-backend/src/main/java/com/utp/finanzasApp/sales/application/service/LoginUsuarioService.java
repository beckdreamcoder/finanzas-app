package com.utp.finanzasApp.sales.application.service;

import com.utp.finanzasApp.sales.domain.model.Usuario;
import com.utp.finanzasApp.sales.domain.repository.UsuarioRepository;
import com.utp.finanzasApp.sales.interfaces.dto.LoginRequestDTO;
import com.utp.finanzasApp.sales.interfaces.dto.LoginResponseDTO;
import com.utp.finanzasApp.support.JwtUtil;
import com.utp.finanzasApp.sales.shared.exceptions.UsuarioNoEncontradoException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class LoginUsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public LoginUsuarioService(
            UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil
    ) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public LoginResponseDTO login(LoginRequestDTO dto) {
        Usuario usuario = usuarioRepository.buscarPorEmail(dto.getEmail())
                .orElseThrow(() -> new UsuarioNoEncontradoException("Usuario no encontrado"));

        if (!passwordEncoder.matches(dto.getPassword(), usuario.getPassword())) {
            throw new UsuarioNoEncontradoException("Contraseña incorrecta");
        }

        String token = jwtUtil.generarToken(usuario);

        return new LoginResponseDTO(
                usuario.getId(),
                usuario.getNombre(),
                usuario.getEmail(),
                token
        );
    }
}
