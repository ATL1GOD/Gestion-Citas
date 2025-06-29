import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CitaConsulta } from '../../models/cita-consulta.model';
import { CitaConsultaService } from '../../services/cita-consulta.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-cita-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, DatePipe],
  templateUrl: './cita-list.component.html',
  styleUrl: './cita-list.component.css'
})
export class CitaListComponent {
  citas: CitaConsulta[] = [];
  error: string | null = null;
  // Podríamos añadir filtros más complejos aquí si fuera necesario

  constructor(private citaService: CitaConsultaService) { }

  ngOnInit(): void {
    this.cargarCitas();
  }

  cargarCitas(): void {
    this.citaService.getAll().subscribe({
      next: (data) => {
        this.citas = data;
        this.error = null;
      },
      error: (err) => {
        this.error = 'No se pudieron cargar las citas.';
        console.error(err);
      }
    });
  }

  cancelarCita(id: number): void {
    if (confirm('¿Está seguro de que desea cancelar esta cita? Esta acción no se puede deshacer.')) {
      // El backend espera el ID del nuevo estatus. Suponiendo que "Cancelada" tiene ID 3.
      // Esto debería obtenerse de forma dinámica, pero lo hardcodeamos para el ejemplo.
      const estatusCancelado = { estatusId: 3 }; 
      this.citaService.update(id, estatusCancelado).subscribe({
          next: () => this.cargarCitas(),
          error: (err) => this.error = "Error al cancelar la cita."
      });
    }
  }

  eliminarCita(id: number): void {
    if (confirm('¿Desea eliminar permanentemente el registro de esta cita?')) {
        this.citaService.delete(id).subscribe({
            next: () => this.cargarCitas(),
            error: (err) => this.error = "Error al eliminar la cita."
        });
    }
  }
}
