package com.utp.finanzasApp.sales.application.service;

import com.utp.finanzasApp.sales.domain.model.MetaAhorro;
import com.utp.finanzasApp.sales.domain.repository.MetaAhorroRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class MetaAhorroService {

    private final MetaAhorroRepository metaAhorroRepository;

    public MetaAhorroService(MetaAhorroRepository metaAhorroRepository) {
        this.metaAhorroRepository = metaAhorroRepository;
    }
}
