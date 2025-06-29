import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PacienteService } from '../../services/paciente.service';
import { TipoUsuarioService } from '../../services/tipo-usuario.service';
import { TipoUsuario } from '../../models/tipo-usuario.model';

@Component({
  selector: 'app-paciente-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './paciente-form.component.html',
  styleUrl: './paciente-form.component.css'
})
export class PacienteFormComponent implements OnInit {

  pacienteForm!: FormGroup;
  isEditMode = false;
  pacienteId: number | null = null;
  tipoUsuarioPaciente: TipoUsuario | undefined;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pacienteService: PacienteService,
    private tipoUsuarioService: TipoUsuarioService
  ) {}

  ngOnInit(): void {
    // Primero, obtenemos el rol "Paciente" del backend.
    this.tipoUsuarioService.getAll().subscribe(tipos => {
        this.tipoUsuarioPaciente = tipos.find(t => t.nombre.toLowerCase() === 'paciente');
        if (!this.tipoUsuarioPaciente) {
            this.error = "Error: El rol 'Paciente' no se encuentra en el sistema. No se pueden crear pacientes.";
        }
    });

    // Creamos un FormGroup anidado para el usuario, reflejando la estructura del modelo Paciente.
    this.pacienteForm = this.fb.group({
      usuario: this.fb.group({
        nombre: ['', Validators.required],
        apellidoPat: ['', Validators.required],
        apellidoMat: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        telefono: ['', Validators.required],
        contrasena: [''], // La validación se añade dinámicamente.
      }),
      curp: ['', [Validators.required, Validators.pattern(/^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS){1}[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$/i)]],
      fechaNacimiento: ['', Validators.required],
      tipoSangre: ['', Validators.required],
      alergias: ['', Validators.required],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.pacienteId = +id;
      this.pacienteForm.get('usuario.contrasena')?.setValidators(null); // No requerida en edición
      this.cargarDatosPaciente(this.pacienteId);
    } else {
      this.pacienteForm.get('usuario.contrasena')?.setValidators([Validators.required, Validators.minLength(6)]);
    }
  }

  cargarDatosPaciente(id: number): void {
    this.pacienteService.getById(id).subscribe({
      next: (data) => {
        // Usamos patchValue para establecer los valores del formulario anidado.
        this.pacienteForm.patchValue(data);
      },
      error: (err) => this.error = "No se pudo cargar la información del paciente."
    });
  }

  onSubmit(): void {
    if (this.pacienteForm.invalid) {
      this.pacienteForm.markAllAsTouched();
      return;
    }
    if (!this.tipoUsuarioPaciente) {
      this.error = "No se puede guardar porque el rol 'Paciente' no está definido.";
      return;
    }

    // Construimos el payload final
    let formValue = this.pacienteForm.getRawValue();
    formValue.usuario.tipoUsuario = this.tipoUsuarioPaciente;

    // Si estamos editando y la contraseña está vacía, la quitamos del objeto.
    if (this.isEditMode && !formValue.usuario.contrasena) {
      delete formValue.usuario.contrasena;
    }

    const operation = this.isEditMode
      ? this.pacienteService.update(this.pacienteId!, formValue)
      : this.pacienteService.create(formValue);

    operation.subscribe({
      next: () => this.router.navigate(['/admin/pacientes']),
      error: (err) => {
        this.error = `Error al ${this.isEditMode ? 'actualizar' : 'crear'} el paciente.`;
        console.error(err);
      }
    });
  }
}