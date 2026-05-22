package com.server.tambito.core.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.server.tambito.infrastructure.persistence.repository.SequenceRepository;
import com.server.tambito.modules.auth.repository.CredencialRepository;

import java.text.DecimalFormat;
import java.util.concurrent.ThreadLocalRandom;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UniqueCodeService {
    private final CredencialRepository credencialRepository;
    private final SequenceRepository sequenceRepository;


    @Transactional
    public long getNextValue(String name) {
        sequenceRepository.increment(name);
        return sequenceRepository.getLastId();
    }

    public String generarCodigo(String prefijo, String sequenceName) {
        long next = getNextValue(sequenceName);
        return String.format("%s%05d", prefijo, next);
    }

    public String generarUsuario(String nombreBase) {
        String limpio = nombreBase
                .replaceAll("\\s+", "")
                .toLowerCase();

        String usuario;
        do {
            int num = ThreadLocalRandom.current().nextInt(0, 100_000);
            usuario = limpio + String.format("%05d", num);
        } while (credencialRepository.findByUsuario(usuario).isPresent());

        return usuario;
    }

    public String generarCodigoProducto(String prefijo, String ultimoCodigo) {
        int nuevoNum = (ultimoCodigo == null)
                ? 1
                : Integer.parseInt(ultimoCodigo.substring(prefijo.length())) + 1;

        return prefijo + new DecimalFormat("00000").format(nuevoNum);
    }

    public String construirPrefijoProducto(String nombreCategoria) {
        if (nombreCategoria == null || nombreCategoria.length() < 2) {
            throw new IllegalArgumentException("Categoría inválida");
        }
        return "COD" + nombreCategoria.substring(0, 2).toUpperCase();
    }
}
