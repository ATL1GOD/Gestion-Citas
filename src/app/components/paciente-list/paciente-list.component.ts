import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Paciente } from '../../models/paciente.model';
import { PacienteService } from '../../services/paciente.service';

@Component({
  selector: 'app-paciente-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './paciente-list.component.html',
  styleUrl: './paciente-list.component.css'
})
export class PacienteListComponent implements OnInit {
  
  pacientes: Paciente[] = [];
  error: string | null = null;

  constructor(private pacienteService: PacienteService) { }

  ngOnInit(): void {
    this.cargarPacientes();
  }

  cargarPacientes(): void {
    this.pacienteService.getAll().subscribe({
      next: (data) => {
        this.pacientes = data;
        this.error = null;
      },
      error: (err) => {
        this.error = 'No se pudieron cargar los pacientes.';
        console.error(err);
      }
    });
  }

  eliminarPaciente(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar este paciente? Esta acción también eliminará su usuario asociado.')) {
      this.pacienteService.delete(id).subscribe({
        next: () => this.cargarPacientes(),
        error: (err) => {
          this.error = 'Error al eliminar el paciente.';
          console.error(err);
        }
      });
    }
  }
}