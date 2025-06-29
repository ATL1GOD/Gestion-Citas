import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './usuario-list.component.html',
  styleUrl: './usuario-list.component.css'
})
export class UsuarioListComponent implements OnInit {

  usuarios: Usuario[] = [];
  error: string | null = null;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.getAll().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.error = null;
      },
      error: (err) => {
        this.error = 'No se pudieron cargar los usuarios.';
        console.error(err);
      }
    });
  }

  eliminarUsuario(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar este usuario? Esta acción no se puede deshacer.')) {
      this.usuarioService.delete(id).subscribe({
        next: () => this.cargarUsuarios(),
        error: (err) => {
          this.error = 'Error al eliminar el usuario.';
          console.error(err);
        }
      });
    }
  }
}

