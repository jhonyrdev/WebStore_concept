package com.server.tambito.infrastructure.security;

import java.io.IOException;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.server.tambito.modules.auth.enums.RolEnum;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtils jwtUtil;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain
    ) throws ServletException, IOException {

        String header = request.getHeader("Authorization");

        // Si no hay token
        if (header == null || !header.startsWith("Bearer ")) {
            chain.doFilter(request, response);
            return;
        }

        try {

            // Obtener token
            String token = header.substring(7);

            System.out.println("TOKEN: " + token);

            // Validar token
            if (jwtUtil.isTokenValid(token)) {

                // Obtener datos del JWT
                String username = jwtUtil.extractUsername(token);
                String rolStr = jwtUtil.extractRole(token);

                System.out.println("USERNAME: " + username);
                System.out.println("ROLE: " + rolStr);

                // Convertir rol
                RolEnum rol = RolEnum.valueOf(rolStr.toUpperCase());

                System.out.println("AUTHORITY: " + rol.getAuthority());

                // Crear autenticación
                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(
                                username,
                                null,
                                List.of(
                                        new SimpleGrantedAuthority(
                                                rol.getAuthority()
                                        )
                                )
                        );

                // Guardar autenticación
                SecurityContextHolder
                        .getContext()
                        .setAuthentication(auth);

            }

        } catch (Exception e) {

            System.out.println("ERROR JWT FILTER");
            e.printStackTrace();

        }

        chain.doFilter(request, response);
    }
}