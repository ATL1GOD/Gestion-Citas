import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteService } from '../../services/reporte.service';
import { saveAs } from 'file-saver';

interface Reporte {
  key: string; // Coincide con la parte de la URL en el backend (ej. 'pacientes')
  label: string;
  description: string;
}

interface ReporteCategoria {
  title: string;
  icon: string;
  reports: Reporte[];
}

@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent {

  // Objeto para manejar el estado de carga de cada botón individualmente
  loading: { [key: string]: boolean } = {};
  error: string | null = null;

  // Define la estructura de los reportes a mostrar en la vista
  reportesPorCategoria: ReporteCategoria[] = [
    {
      title: 'Reportes de Directorio y Personal',
      icon: 'bi-people-fill',
      reports: [
        { key: 'pacientes', label: 'Reporte de Pacientes', description: 'Lista completa de todos los pacientes registrados.' },
        { key: 'doctores', label: 'Reporte de Doctores', description: 'Lista completa de doctores y sus especialidades.' },
        { key: 'recepcionistas', label: 'Reporte de Recepcionistas', description: 'Lista del personal de recepción y sus asignaciones.' }
      ]
    },
    {
      title: 'Reportes Clínicos y de Operación',
      icon: 'bi-heart-pulse-fill',
      reports: [
        { key: 'citas', label: 'Reporte de Citas', description: 'Historial completo de todas las citas agendadas.' },
        { key: 'recetas', label: 'Reporte de Recetas', description: 'Consolidado de todas las recetas médicas emitidas.' },
        { key: 'historiales', label: 'Reporte de Historiales Clínicos', description: 'Todos los registros clínicos de todos los pacientes.' }
      ]
    },
    {
      title: 'Reportes de Sistema y Catálogos',
      icon: 'bi-gear-fill',
      reports: [
        { key: 'usuarios', label: 'Reporte de Usuarios', description: 'Lista de todas las cuentas de usuario del sistema.' },
        { key: 'consultorios', label: 'Reporte de Consultorios', description: 'Catálogo de consultorios y su estatus actual.' },
        { key: 'medicamentos', label: 'Reporte de Medicamentos', description: 'Catálogo completo de medicamentos disponibles.' },
        { key: 'especialidades', label: 'Reporte de Especialidades', description: 'Lista de todas las especialidades médicas.' }
      ]
    }
  ];

  constructor(private reporteService: ReporteService) { }

  generarReporte(reporteKey: string): void {
    this.loading[reporteKey] = true; // Activa el spinner para este botón
    this.error = null;

    this.reporteService.descargarReportePdf(reporteKey).subscribe({
      next: (blob) => {
        // Usa file-saver para iniciar la descarga del archivo
        saveAs(blob, `reporte_${reporteKey}_${new Date().toISOString().substring(0,10)}.pdf`);
        this.loading[reporteKey] = false;
      },
      error: (err) => {
        this.error = `Error al generar el reporte de ${reporteKey}. Por favor, intente de nuevo.`;
        this.loading[reporteKey] = false;
        console.error(err);
      }
    });
  }
}