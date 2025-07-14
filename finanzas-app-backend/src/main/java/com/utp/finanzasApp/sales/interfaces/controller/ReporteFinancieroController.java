package com.utp.finanzasApp.sales.interfaces.controller;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
import com.utp.finanzasApp.sales.application.service.ReporteFinancieroService;
import com.utp.finanzasApp.sales.application.service.SaldoService;
import com.utp.finanzasApp.sales.domain.model.Usuario;
import com.utp.finanzasApp.sales.interfaces.dto.MovimientoDTO;
import com.utp.finanzasApp.support.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/reportes")
public class ReporteFinancieroController {

    private final ReporteFinancieroService reporteFinancieroService;
    private final SaldoService saldoService;

    @Autowired
    private JwtUtil jwtUtil;

    public ReporteFinancieroController(ReporteFinancieroService reporteFinancieroService, SaldoService saldoService) {
        this.reporteFinancieroService = reporteFinancieroService;
        this.saldoService = saldoService;
    }

    @GetMapping("/estado-cuenta")
    public void generarEstadoCuenta(
            @RequestHeader("Authorization") String token,
            @RequestParam(required = false) String filtro,
            @RequestParam(required = false) String fechaInicio,
            @RequestParam(required = false) String fechaFin,
            HttpServletResponse response
    ) throws IOException, DocumentException {

        Long usuarioId = jwtUtil.obtenerUsuarioIdDesdeToken(token);

        // Determinar rango de fechas según el filtro
        LocalDateTime hoy = LocalDateTime.now();
        LocalDateTime inicio = null;
        LocalDateTime fin = hoy;

        if ("hoy".equalsIgnoreCase(filtro)) {
            inicio = hoy;
        } else if ("3dias".equalsIgnoreCase(filtro)) {
            inicio = hoy.minusDays(2);
        } else if ("7dias".equalsIgnoreCase(filtro)) {
            inicio = hoy.minusDays(6);
        } else if ("personalizado".equalsIgnoreCase(filtro)) {
            inicio = (fechaInicio != null) ? LocalDateTime.parse(fechaInicio) : null;
            fin = (fechaFin != null) ? LocalDateTime.parse(fechaFin) : hoy;
        }

        Usuario usuario = reporteFinancieroService.obtenerDatosUsuario(usuarioId);
        double saldo = saldoService.calcularSaldo(usuarioId);
        List<MovimientoDTO> movimientos = reporteFinancieroService.obtenerMovimientosUsuario(usuarioId, inicio, fin);

        // Ordenar por fecha descendente
        movimientos.sort((m1, m2) -> m2.getFecha().compareTo(m1.getFecha()));

        response.setContentType("application/pdf");
        response.setHeader("Content-Disposition", "attachment; filename=estado_cuenta.pdf");

        Document document = new Document();
        PdfWriter.getInstance(document, response.getOutputStream());

        document.open();
        document.add(new Paragraph("ESTADO DE CUENTA"));
        document.add(new Paragraph("Fecha de generación: " + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"))));
        document.add(new Paragraph(" "));

        document.add(new Paragraph("Saldo Actual: S/. " + String.format("%.2f", saldo)));
        document.add(new Paragraph("Nombre: " + usuario.getNombre()));
        document.add(new Paragraph("Correo: " + usuario.getEmail()));
        document.add(new Paragraph(" "));
        document.add(new Paragraph(" "));

        if (inicio != null) {
            document.add(new Paragraph("Movimientos desde: " + inicio + " hasta: " + fin));
        } else {
            document.add(new Paragraph("Todos los movimientos disponibles"));
        }
        document.add(new Paragraph(" "));

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

        for (MovimientoDTO mov : movimientos) {
            String linea = String.format("%s - %s - S/. %.2f - %s",
                    mov.getFecha().format(formatter),
                    mov.getTipo(),
                    mov.getMonto(),
                    mov.getDescripcion());
            document.add(new Paragraph(linea));
        }

        document.close();
    }
}
