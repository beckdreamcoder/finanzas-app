package com.utp.finanzasApp.support;

import com.utp.finanzasApp.sales.domain.model.Usuario;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private final SecretKey claveSecreta = Keys.hmacShaKeyFor("mi_super_clave_secreta_segura_1234567890".getBytes());

    public String generarToken(Usuario usuario) {
        return Jwts.builder()
                .setSubject(usuario.getEmail())
                .claim("usuarioId", usuario.getId())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000))
                .signWith(claveSecreta, SignatureAlgorithm.HS256)
                .compact();
    }

    public Long obtenerUsuarioIdDesdeToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(claveSecreta)
                .build()
                .parseClaimsJws(token.replace("Bearer ", ""))
                .getBody();
        return claims.get("usuarioId", Long.class);
    }
}

