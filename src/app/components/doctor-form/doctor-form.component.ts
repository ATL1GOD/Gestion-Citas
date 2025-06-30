import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DoctorService } from '../../services/doctor.service';
import { EspecialidadService } from '../../services/especialidad.service';
import { TipoUsuarioService } from '../../services/tipo-usuario.service';
import { Especialidad } from '../../models/especialidad.model';
import { TipoUsuario } from '../../models/tipo-usuario.model';

@Component({
  selector: 'app-doctor-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './doctor-form.component.html',
  styleUrl: './doctor-form.component.css'
})
export class DoctorFormComponent implements OnInit {

  doctorForm!: FormGroup;
  isEditMode = false;
  doctorId: number | null = null;
  especialidades: Especialidad[] = [];
  tipoUsuarioDoctor: TipoUsuario | undefined;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private doctorService: DoctorService,
    private especialidadService: EspecialidadService,
    private tipoUsuarioService: TipoUsuarioService
  ) {}

  ngOnInit(): void {
    this.cargarDatosDeApoyo();

    this.doctorForm = this.fb.group({
      usuario: this.fb.group({
        nombre: ['', Validators.required],
        apellidoPat: ['', Validators.required],
        apellidoMat: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        telefono: ['', Validators.required],
        contrasena: [''], // Validación dinámica
      }),
      noCedula: ['', Validators.required],
      especialidad: [null, Validators.required],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.doctorId = +id;
      this.doctorForm.get('usuario.contrasena')?.setValidators(null);
      this.cargarDatosDoctor(this.doctorId);
    } else {
      this.doctorForm.get('usuario.contrasena')?.setValidators([Validators.required, Validators.minLength(6)]);
    }
  }

  cargarDatosDeApoyo(): void {
    this.especialidadService.getAll().subscribe(data => this.especialidades = data);
    this.tipoUsuarioService.getAll().subscribe(tipos => {
        this.tipoUsuarioDoctor = tipos.find(t => t.nombre.toLowerCase() === 'doctor');
        if (!this.tipoUsuarioDoctor) {
            this.error = "Error: El rol 'Doctor' no se encuentra en el sistema.";
        }
    });
  }

  cargarDatosDoctor(id: number): void {
    this.doctorService.getById(id).subscribe({
      next: (data) => {
        this.doctorForm.patchValue({
            usuario: data.usuario,
            noCedula: data.noCedula,
            especialidad: this.especialidades.find(e => e.idEspecialidad === data.especialidad.idEspecialidad)
        });
      },
      error: (err) => this.error = "No se pudo cargar la información del doctor."
    });
  }

  compareEspecialidades(e1: Especialidad, e2: Especialidad): boolean {
    return e1 && e2 ? e1.idEspecialidad === e2.idEspecialidad : e1 === e2;
  }

  onSubmit(): void {
    if (this.doctorForm.invalid || !this.tipoUsuarioDoctor) {
      this.doctorForm.markAllAsTouched();
      if (!this.tipoUsuarioDoctor) this.error = "No se puede guardar porque el rol 'Doctor' no está definido.";
      return;
    }

    let formValue = this.doctorForm.getRawValue();
    formValue.usuario.tipoUsuario = this.tipoUsuarioDoctor;

    if (this.isEditMode && !formValue.usuario.contrasena) {
      delete formValue.usuario.contrasena;
    }

    const operation = this.isEditMode
      ? this.doctorService.update(this.doctorId!, formValue)
      : this.doctorService.create(formValue);

    operation.subscribe({
      next: () => this.router.navigate(['/admin/doctores']),
      error: (err) => {
        this.error = `Error al ${this.isEditMode ? 'actualizar' : 'crear'} el doctor.`;
        console.error(err);
      }
    });
  }
}