import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TipoUsuarioService } from '../../services/tipo-usuario.service';

@Component({
  selector: 'app-tipo-usuario-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './tipo-usuario-form.component.html',
  styleUrl: './tipo-usuario-form.component.css'
})
export class TipoUsuarioFormComponent implements OnInit {

  rolForm!: FormGroup;
  isEditMode = false;
  rolId: number | null = null;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tipoUsuarioService: TipoUsuarioService
  ) {}

  ngOnInit(): void {
    this.rolForm = this.fb.group({
      nombre: ['', Validators.required]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.rolId = +id;
      this.cargarDatosRol(this.rolId);
    }
  }

  cargarDatosRol(id: number): void {
    this.tipoUsuarioService.getById(id).subscribe({
      next: (data) => this.rolForm.patchValue(data),
      error: (err) => {
        this.error = "No se pudo cargar el rol para editar.";
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.rolForm.invalid) {
      this.rolForm.markAllAsTouched();
      return;
    }

    const formValue = this.rolForm.value;

    const operation = this.isEditMode
      ? this.tipoUsuarioService.update(this.rolId!, formValue)
      : this.tipoUsuarioService.create(formValue);

    operation.subscribe({
      next: () => this.router.navigate(['/admin/roles']),
      error: (err) => {
        this.error = `Error al ${this.isEditMode ? 'actualizar' : 'crear'} el rol.`;
        console.error(err);
      }
    });
  }
}

