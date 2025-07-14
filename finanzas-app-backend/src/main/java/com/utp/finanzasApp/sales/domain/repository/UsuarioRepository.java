package com.utp.finanzasApp.sales.domain.repository;

import com.utp.finanzasApp.sales.domain.model.Usuario;
import java.util.Optional;

public interface UsuarioRepository {
    Optional<Usuario> buscarPorEmail(String email);
    Usuario guardar(Usuario usuario); // ✅ Este es el nuevo método que necesitas
    Optional<Usuario> buscarPorId(Long id);
}
