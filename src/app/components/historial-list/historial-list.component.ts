import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HistorialClinico } from '../../models/historial-clinico.model';
import { HistorialClinicoService } from '../../services/historial-clinico.service';
import { ReporteService } from '../../services/reporte.service';

@Component({
  selector: 'app-historial-list',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './historial-list.component.html',
  styleUrl: './historial-list.component.css'
})
export class HistorialListComponent implements OnInit {

  historiales: HistorialClinico[] = [];
  error: string | null = null;
  emailEnviado: string | null = null;

  constructor(
    private historialService: HistorialClinicoService,
    private reporteService: ReporteService // Para enviar por email
  ) { }

  ngOnInit(): void {
    this.cargarHistoriales();
  }

  cargarHistoriales(): void {
    this.historialService.getAll().subscribe({
      next: (data) => {
        this.historiales = data;
        this.error = null;
      },
      error: (err) => {
        this.error = 'No se pudieron cargar los historiales clínicos.';
        console.error(err);
      }
    });
  }

  enviarPorEmail(pacienteId: number, event: Event): void {
    event.stopPropagation(); // Evita que se dispare el click de la fila
    if (confirm('¿Está seguro de que desea enviar el historial completo de este paciente a su correo electrónico?')) {
      this.reporteService.enviarHistorialPorEmail(pacienteId).subscribe({
        next: (response) => {
            this.emailEnviado = response.mensaje || 'Historial enviado con éxito.';
            setTimeout(() => this.emailEnviado = null, 5000); // Ocultar mensaje después de 5 seg
        },
        error: (err) => {
            this.error = 'Error al enviar el historial por email.';
            console.error(err);
        }
      });
    }
  }

  verDetalles(id: number): void {
    // Implementar navegación a la vista de detalles
    // this.router.navigate(['/consultas/historiales', id]);
  }
}