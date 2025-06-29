import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Especialidad } from '../../models/especialidad.model';
import { EspecialidadService } from '../../services/especialidad.service';

@Component({
  selector: 'app-especialidad-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './especialidad-list.component.html',
  styleUrl: './especialidad-list.component.css'
})
export class EspecialidadListComponent implements OnInit {

  especialidades: Especialidad[] = [];
  error: string | null = null;

  constructor(private especialidadService: EspecialidadService) { }

  ngOnInit(): void {
    this.cargarEspecialidades();
  }

  cargarEspecialidades(): void {
    this.especialidadService.getAll().subscribe({
      next: (data) => {
        this.especialidades = data;
        this.error = null;
      },
      error: (err) => {
        this.error = 'No se pudieron cargar las especialidades.';
        console.error(err);
      }
    });
  }

  eliminarEspecialidad(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar esta especialidad?')) {
      this.especialidadService.delete(id).subscribe({
        next: () => this.cargarEspecialidades(),
        error: (err) => {
          this.error = 'Error al eliminar la especialidad.';
          console.error(err);
        }
      });
    }
  }
}