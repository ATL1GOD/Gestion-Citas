import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';
import { TipoUsuarioService } from '../../services/tipo-usuario.service';
import { TipoUsuario } from '../../models/tipo-usuario.model';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css'
})
export class UsuarioFormComponent implements OnInit {

  usuarioForm!: FormGroup;
  tiposUsuario: TipoUsuario[] = [];
  isEditMode = false;
  usuarioId: number | null = null;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService,
    private tipoUsuarioService: TipoUsuarioService
  ) {}

  ngOnInit(): void {
    this.cargarTiposUsuario();

    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidoPat: ['', Validators.required],
      apellidoMat: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      contrasena: [''], // La contraseña no es obligatoria al editar
      tipoUsuario: [null, Validators.required]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.usuarioId = +id;
      // Al editar, la contraseña no es requerida
      this.usuarioForm.get('contrasena')?.setValidators(null);
      this.cargarDatosUsuario(this.usuarioId);
    } else {
      // Al crear, la contraseña es requerida
      this.usuarioForm.get('contrasena')?.setValidators([Validators.required, Validators.minLength(6)]);
    }
  }

  cargarTiposUsuario(): void {
    this.tipoUsuarioService.getAll().subscribe(data => this.tiposUsuario = data);
  }

  cargarDatosUsuario(id: number): void {
    this.usuarioService.getById(id).subscribe({
      next: (data) => {
        // `patchValue` es ideal aquí porque no necesita todos los campos del formulario
        this.usuarioForm.patchValue({
          ...data,
          // El control 'tipoUsuario' espera el objeto completo para que el select funcione
          tipoUsuario: this.tiposUsuario.find(tu => tu.id === data.tipoUsuario.id)
        });
      },
      error: (err) => this.error = "No se pudo cargar el usuario."
    });
  }
  
  // Para que el <select> compare objetos correctamente
  compareRoles(t1: TipoUsuario, t2: TipoUsuario): boolean {
    return t1 && t2 ? t1.id === t2.id : t1 === t2;
  }

  onSubmit(): void {
    if (this.usuarioForm.invalid) {
      this.usuarioForm.markAllAsTouched();
      return;
    }
    
    const formValue: Usuario = this.usuarioForm.value;

    // Si estamos en modo edición y la contraseña está vacía, la eliminamos del objeto
    // para que el backend no la actualice a un valor nulo o vacío.
    if (this.isEditMode && !formValue.contrasena) {
      delete formValue.contrasena;
    }

    const operation = this.isEditMode
      ? this.usuarioService.update(this.usuarioId!, formValue)
      : this.usuarioService.create(formValue);

    operation.subscribe({
      next: () => this.router.navigate(['/admin/usuarios']),
      error: (err) => {
        this.error = `Error al ${this.isEditMode ? 'actualizar' : 'crear'} el usuario.`;
        console.error(err);
      }
    });
  }
}