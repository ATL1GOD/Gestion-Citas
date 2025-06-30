import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Horario } from '../../models/horario.model';
import { HorarioService } from '../../services/horario.service';

@Component({
  selector: 'app-horario-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './horario-list.component.html',
  styleUrl: './horario-list.component.css'
})
export class HorarioListComponent implements OnInit {
  
  horarios: Horario[] = [];
  error: string | null = null;

  constructor(private horarioService: HorarioService) { }

  ngOnInit(): void {
    this.cargarHorarios();
  }

  cargarHorarios(): void {
    this.horarioService.getAll().subscribe({
      next: (data) => {
        this.horarios = data;
        this.error = null;
      },
      error: (err) => this.error = 'No se pudieron cargar los horarios.'
    });
  }

  eliminarHorario(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar este horario?')) {
      this.horarioService.delete(id).subscribe({
        next: () => this.cargarHorarios(),
        error: (err) => this.error = 'Error al eliminar el horario.'
      });
    }
  }
}