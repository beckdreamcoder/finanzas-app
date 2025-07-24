package com.utp.finanzasApp.sales.interfaces.controller;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
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
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Stream;

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

        LocalDateTime hoy = LocalDateTime.now();
        LocalDateTime inicio = null;
        LocalDateTime fin = hoy;

        if ("hoy".equalsIgnoreCase(filtro)) {
            inicio = hoy.toLocalDate().atStartOfDay();
            fin = hoy.toLocalDate().atTime(23, 59, 59, 999_000_000);
        } else if ("3dias".equalsIgnoreCase(filtro)) {
            inicio = hoy.minusDays(2).toLocalDate().atStartOfDay();
            fin = hoy.toLocalDate().atTime(23, 59, 59, 999_000_000);
        } else if ("7dias".equalsIgnoreCase(filtro)) {
            inicio = hoy.minusDays(6).toLocalDate().atStartOfDay();
            fin = hoy.toLocalDate().atTime(23, 59, 59, 999_000_000);
        } else if ("personalizado".equalsIgnoreCase(filtro)) {
            inicio = (fechaInicio != null) ? LocalDateTime.parse(fechaInicio) : null;
            fin = (fechaFin != null) ? LocalDateTime.parse(fechaFin) : hoy;
        }

        Usuario usuario = reporteFinancieroService.obtenerDatosUsuario(usuarioId);
        double saldo = saldoService.calcularSaldo(usuarioId);
        List<MovimientoDTO> movimientos = reporteFinancieroService.obtenerMovimientosUsuario(usuarioId, inicio, fin);
        movimientos.sort((m1, m2) -> m2.getFecha().compareTo(m1.getFecha()));

        double totalIngresos = movimientos.stream()
                .filter(m -> "INGRESO".equalsIgnoreCase(m.getTipo()))
                .mapToDouble(MovimientoDTO::getMonto)
                .sum();

        double totalGastos = movimientos.stream()
                .filter(m -> "GASTO".equalsIgnoreCase(m.getTipo()))
                .mapToDouble(MovimientoDTO::getMonto)
                .sum();

        response.setContentType("application/pdf");
        response.setHeader("Content-Disposition", "attachment; filename=estado_cuenta.pdf");

        Document document = new Document();
        PdfWriter.getInstance(document, response.getOutputStream());
        document.open();

        Font tituloFont = new Font(Font.FontFamily.HELVETICA, 18, Font.BOLD);
        Font normalFont = new Font(Font.FontFamily.HELVETICA, 12);
        Font boldFont = new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD);
        Font ingresoFont = new Font(Font.FontFamily.HELVETICA, 12, Font.NORMAL, BaseColor.GREEN.darker());
        Font gastoFont = new Font(Font.FontFamily.HELVETICA, 12, Font.NORMAL, BaseColor.RED);

        document.add(new Paragraph("\uD83C\uDFE6 ESTADO DE CUENTA", tituloFont));
        document.add(new Paragraph("Fecha de generación: " + hoy.format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")), normalFont));
        document.add(new Paragraph(" "));

        document.add(new Paragraph("\uD83D\uDC64 Nombre: " + usuario.getNombre(), normalFont));
        document.add(new Paragraph("\uD83D\uDCE7 Correo: " + usuario.getEmail(), normalFont));
        document.add(new Paragraph("\uD83D\uDCB0 Saldo Actual: S/. " + String.format("%.2f", saldo), boldFont));
        document.add(new Paragraph(" "));

        if (inicio != null) {
            document.add(new Paragraph("\uD83D\uDCC6 Movimientos desde: " +
                    inicio.format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")) +
                    " hasta: " + fin.format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")), boldFont));
        } else {
            document.add(new Paragraph("\uD83D\uDCC2 Todos los movimientos disponibles", boldFont));
        }

        document.add(new Paragraph(" "));

        PdfPTable table = new PdfPTable(4);
        table.setWidthPercentage(100);
        table.setSpacingBefore(10f);
        table.setSpacingAfter(10f);
        table.setWidths(new float[]{3f, 2f, 2f, 5f});

        Stream.of("Fecha", "Tipo", "Monto", "Descripci\u00F3n").forEach(header -> {
            PdfPCell cell = new PdfPCell(new Paragraph(header, boldFont));
            cell.setPadding(6f);
            cell.setBackgroundColor(new BaseColor(230, 230, 250));
            table.addCell(cell);
        });

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");

        for (MovimientoDTO mov : movimientos) {
            Font tipoFont = "INGRESO".equalsIgnoreCase(mov.getTipo()) ? ingresoFont : gastoFont;

            table.addCell(new Paragraph(mov.getFecha().format(formatter), normalFont));
            table.addCell(new Paragraph(mov.getTipo(), tipoFont));
            table.addCell(new Paragraph("S/ " + String.format("%.2f", mov.getMonto()), tipoFont));
            table.addCell(new Paragraph(mov.getDescripcion(), normalFont));
        }

        document.add(table);

        document.add(new Paragraph("\uD83D\uDCC8 Total Ingresos: S/. " + String.format("%.2f", totalIngresos), ingresoFont));
        document.add(new Paragraph("\uD83D\uDCC9 Total Gastos: S/. " + String.format("%.2f", totalGastos), gastoFont));
        document.add(new Paragraph(" "));

        document.close();
    }
}