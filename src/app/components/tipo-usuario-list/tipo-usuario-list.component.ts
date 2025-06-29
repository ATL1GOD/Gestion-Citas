import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TipoUsuario } from '../../models/tipo-usuario.model';
import { TipoUsuarioService } from '../../services/tipo-usuario.service';

@Component({
  selector: 'app-tipo-usuario-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tipo-usuario-list.component.html',
  styleUrl: './tipo-usuario-list.component.css'
})
export class TipoUsuarioListComponent {
tiposUsuario: TipoUsuario[] = [];
  error: string | null = null;

  constructor(private tipoUsuarioService: TipoUsuarioService) { }

  ngOnInit(): void {
    this.cargarRoles();
  }

  cargarRoles(): void {
    this.tipoUsuarioService.getAll().subscribe({
      next: (data) => {
        this.tiposUsuario = data;
        this.error = null;
      },
      error: (err) => {
        this.error = 'No se pudieron cargar los roles. Intente de nuevo más tarde.';
        console.error(err);
      }
    });
  }

  eliminarRol(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar este rol?')) {
      this.tipoUsuarioService.delete(id).subscribe({
        next: () => {
          // Recargar la lista para reflejar el cambio
          this.cargarRoles();
        },
        error: (err) => {
          this.error = 'Error al eliminar el rol.';
          console.error(err);
        }
      });
    }
  }
}
