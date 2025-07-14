package com.utp.finanzasApp.sales.infrastructure.mapper;

import com.utp.finanzasApp.sales.domain.model.Usuario;
import com.utp.finanzasApp.sales.infrastructure.entities.UsuarioEntity;

public class UsuarioMapper {

    public static UsuarioEntity toEntity(Usuario usuario) {
        return new UsuarioEntity(
                usuario.getId(),
                usuario.getNombre(),
                usuario.getEmail(),
                usuario.getPassword()
        );
    }

    public static Usuario toDomain(UsuarioEntity entity) {
        return new Usuario(
                entity.getId(),
                entity.getNombre(),
                entity.getEmail(),
                entity.getPassword()
        );
    }
}

