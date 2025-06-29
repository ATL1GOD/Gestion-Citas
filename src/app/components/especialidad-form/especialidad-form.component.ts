import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EspecialidadService } from '../../services/especialidad.service';

@Component({
  selector: 'app-especialidad-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './especialidad-form.component.html',
  styleUrl: './especialidad-form.component.css'
})
export class EspecialidadFormComponent implements OnInit {

  especialidadForm!: FormGroup;
  isEditMode = false;
  especialidadId: number | null = null;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private especialidadService: EspecialidadService
  ) {}

  ngOnInit(): void {
    this.especialidadForm = this.fb.group({
      // El backend espera 'idEspecialidad', pero para crear no lo necesitamos.
      // El formulario solo gestiona los campos que el usuario puede editar.
      nombre: ['', Validators.required]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.especialidadId = +id;
      this.cargarDatosEspecialidad(this.especialidadId);
    }
  }

  cargarDatosEspecialidad(id: number): void {
    this.especialidadService.getById(id).subscribe({
      next: (data) => this.especialidadForm.patchValue(data),
      error: (err) => {
        this.error = "No se pudo cargar la especialidad.";
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.especialidadForm.invalid) {
      this.especialidadForm.markAllAsTouched();
      return;
    }

    // El backend espera un objeto con 'idEspecialidad' para la actualización.
    const formData = {
      ...this.especialidadForm.value,
      idEspecialidad: this.especialidadId // Será null en modo creación, lo que está bien.
    };

    const operation = this.isEditMode
      ? this.especialidadService.update(this.especialidadId!, formData)
      : this.especialidadService.create(formData);

    operation.subscribe({
      next: () => this.router.navigate(['/admin/especialidades']),
      error: (err) => {
        this.error = `Error al ${this.isEditMode ? 'actualizar' : 'crear'} la especialidad.`;
        console.error(err);
      }
    });
  }
}