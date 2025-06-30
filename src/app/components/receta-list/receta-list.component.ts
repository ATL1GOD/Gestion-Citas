import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Receta } from '../../models/receta.model';
import { RecetaService } from '../../services/receta.service';

@Component({
  selector: 'app-receta-list',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './receta-list.component.html',
  styleUrl: './receta-list.component.css'
})
export class RecetaListComponent implements OnInit {

  recetas: Receta[] = [];
  error: string | null = null;

  constructor(private recetaService: RecetaService) {}

  ngOnInit(): void {
    this.cargarRecetas();
  }

  cargarRecetas(): void {
    this.recetaService.getAll().subscribe({
      next: data => this.recetas = data,
      error: err => this.error = "No se pudieron cargar las recetas."
    });
  }

  eliminarReceta(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar esta receta y todos sus medicamentos asociados?')) {
      this.recetaService.delete(id).subscribe({
        next: () => this.cargarRecetas(),
        error: err => this.error = 'Error al eliminar la receta.'
      });
    }
  }
}