/*import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DoctorService } from '../../services/doctor.service';
import { EspecialidadService } from '../../services/especialidad.service';
import { TipoUsuarioService } from '../../services/tipo-usuario.service';
import { UsuarioService } from '../../services/usuario.service';
import { Especialidad } from '../../models/especialidad.model';
import { TipoUsuario } from '../../models/tipo-usuario.model';
import { switchMap } from 'rxjs/operators';
import { Doctor } from '../../models/doctor.model';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-doctor-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './doctor-form.component.html',
  styleUrl: './doctor-form.component.css',
})
export class DoctorFormComponent implements OnInit {
  doctorForm!: FormGroup;
  isEditMode = false;
  doctorId: number | null = null;
  usuarioId: number | null = null;
  especialidades: Especialidad[] = [];
  tipoUsuarioDoctor: TipoUsuario | undefined;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private doctorService: DoctorService,
    private especialidadService: EspecialidadService,
    private tipoUsuarioService: TipoUsuarioService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    // ... (sin cambios aquí)
    this.cargarDatosDeApoyo();

    this.doctorForm = this.fb.group({
      usuario: this.fb.group({
        idUsuario: [null],
        nombre: ['', Validators.required],
        apellidoPat: ['', Validators.required],
        apellidoMat: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        telefono: ['', Validators.required],
        contrasena: [''],
        tipoUsuario: [null],
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
      this.doctorForm
        .get('usuario.contrasena')
        ?.setValidators([Validators.required, Validators.minLength(6)]);
    }
  }

  cargarDatosDeApoyo(): void {
    // ... (sin cambios aquí)
    this.especialidadService
      .getAll()
      .subscribe((data) => (this.especialidades = data));
    this.tipoUsuarioService.getAll().subscribe((tipos) => {
      this.tipoUsuarioDoctor = tipos.find(
        (t) => t.nombre.toLowerCase() === 'doctor'
      );
      if (!this.tipoUsuarioDoctor) {
        this.error = "Error: El rol 'Doctor' no se encuentra en el sistema.";
      }
    });
  }

  cargarDatosDoctor(id: number): void {
    // ... (sin cambios aquí)
    this.doctorService.getById(id).subscribe({
      next: (data) => {
        this.usuarioId = data.usuario.idUsuario;
        this.doctorForm.patchValue({
          usuario: data.usuario,
          noCedula: data.noCedula,
          especialidad: this.especialidades.find(
            (e) => e.idEspecialidad === data.especialidad.idEspecialidad
          ),
        });
        this.doctorForm
          .get('usuario.tipoUsuario')
          ?.setValue(data.usuario.tipoUsuario);
      },
      error: (err) =>
        (this.error = 'No se pudo cargar la información del doctor.'),
    });
  }

  compareEspecialidades(e1: Especialidad, e2: Especialidad): boolean {
    return e1 && e2 ? e1.idEspecialidad === e2.idEspecialidad : e1 === e2;
  }

  // <-- MÉTODO onSubmit CON LA CORRECCIÓN FINAL
  onSubmit(): void {
    if (this.doctorForm.invalid) {
      this.doctorForm.markAllAsTouched();
      return;
    }

    if (this.isEditMode) {
      if (!this.doctorId || !this.usuarioId) {
        this.error = 'Error: Faltan los identificadores para actualizar.';
        return;
      }

      const formValue = this.doctorForm.getRawValue();
      const usuarioPayload = { ...formValue.usuario };
      if (!usuarioPayload.contrasena) {
        delete usuarioPayload.contrasena;
      }

      this.usuarioService
        .update(this.usuarioId, usuarioPayload)
        .pipe(
          switchMap((updatedUser) => {
            // --- LA CORRECCIÓN CLAVE ESTÁ AQUÍ ---
            // Se construye el payload del doctor DESPUÉS de que el usuario se actualizó,
            // usando el objeto 'updatedUser' que retornó el servidor.
            const doctorPayload: Partial<Doctor> = {
              idDoctor: this.doctorId!,
              noCedula: formValue.noCedula,
              especialidad: formValue.especialidad,
              usuario: updatedUser, // Usamos el objeto de usuario completo y actualizado.
            };
            // ------------------------------------

            return this.doctorService.update(
              this.doctorId!,
              doctorPayload as Doctor
            );
          })
        )
        .subscribe({
          next: () => {
            this.router.navigate(['/admin/doctores']);
          },
          error: (err) => {
            this.error =
              'Ocurrió un error al actualizar el doctor. Revise la consola.';
            console.error(err);
          },
        });
    } else {
      // La lógica de creación no cambia.
      if (!this.tipoUsuarioDoctor) {
        this.error = "No se puede guardar: rol 'Doctor' no definido.";
        return;
      }
      let formValue = this.doctorForm.getRawValue();
      formValue.usuario.tipoUsuario = this.tipoUsuarioDoctor;
      delete formValue.usuario.idUsuario;

      this.doctorService.create(formValue).subscribe({
        next: () => this.router.navigate(['/admin/doctores']),
        error: (err) => {
          this.error = 'Error al crear el doctor.';
          console.error(err);
        },
      });
    }
  }
}
*/

import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DoctorService } from '../../services/doctor.service';
import { EspecialidadService } from '../../services/especialidad.service';
import { TipoUsuarioService } from '../../services/tipo-usuario.service';
import { UsuarioService } from '../../services/usuario.service';
import { Especialidad } from '../../models/especialidad.model';
import { TipoUsuario } from '../../models/tipo-usuario.model';
import { switchMap } from 'rxjs/operators';
import { Doctor } from '../../models/doctor.model';

@Component({
  selector: 'app-doctor-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './doctor-form.component.html',
  styleUrl: './doctor-form.component.css',
})
export class DoctorFormComponent implements OnInit {
  doctorForm!: FormGroup;
  isEditMode = false;
  doctorId: number | null = null;
  usuarioId: number | null = null;
  especialidades: Especialidad[] = [];
  tipoUsuarioDoctor: TipoUsuario | undefined;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private doctorService: DoctorService,
    private especialidadService: EspecialidadService,
    private tipoUsuarioService: TipoUsuarioService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.cargarDatosDeApoyo();

    this.doctorForm = this.fb.group({
      usuario: this.fb.group({
        idUsuario: [null],
        nombre: ['', Validators.required],
        apellidoPat: ['', Validators.required],
        apellidoMat: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        telefono: ['', Validators.required],
        contrasena: [''],
        tipoUsuario: [null],
      }),
      noCedula: ['', Validators.required],
      especialidad: [null, Validators.required],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.doctorId = +id;
      this.doctorForm.get('usuario.contrasena')?.setValidators(null);
      this.cargarDatosDeApoyo(); // Se asegura que las especialidades estén cargadas
      this.cargarDatosDoctor(this.doctorId);
    } else {
      this.doctorForm
        .get('usuario.contrasena')
        ?.setValidators([Validators.required, Validators.minLength(6)]);
    }
  }

  cargarDatosDeApoyo(): void {
    this.especialidadService
      .getAll()
      .subscribe((data) => (this.especialidades = data));
    this.tipoUsuarioService.getAll().subscribe((tipos) => {
      this.tipoUsuarioDoctor = tipos.find(
        (t) => t.nombre.toLowerCase() === 'doctor'
      );
    });
  }

  cargarDatosDoctor(id: number): void {
    this.doctorService.getById(id).subscribe({
      next: (data) => {
        this.usuarioId = data.usuario.idUsuario;
        this.doctorForm.patchValue({
          usuario: data.usuario,
          noCedula: data.noCedula,
          especialidad: this.especialidades.find(
            (e) => e.idEspecialidad === data.especialidad.idEspecialidad
          ),
        });
        this.doctorForm
          .get('usuario.tipoUsuario')
          ?.setValue(data.usuario.tipoUsuario);
      },
      error: (err) =>
        (this.error = 'No se pudo cargar la información del doctor.'),
    });
  }

  compareEspecialidades(e1: Especialidad, e2: Especialidad): boolean {
    return e1 && e2 ? e1.idEspecialidad === e2.idEspecialidad : e1 === e2;
  }

  onSubmit(): void {
    if (this.doctorForm.invalid) {
      this.doctorForm.markAllAsTouched();
      return;
    }

    if (this.isEditMode) {
      if (!this.doctorId || !this.usuarioId) {
        this.error = 'Error: Faltan los identificadores para actualizar.';
        return;
      }

      const formValue = this.doctorForm.getRawValue();
      const usuarioPayload = { ...formValue.usuario };

      if (!usuarioPayload.contrasena) {
        delete usuarioPayload.contrasena;
      }

      this.usuarioService
        .update(this.usuarioId, usuarioPayload)
        .pipe(
          switchMap((updatedUser) => {
            // ----- LA CORRECCIÓN FINAL ESTÁ AQUÍ -----
            // Construimos el payload del doctor con los objetos completos,
            // que es lo que el backend espera.
            const doctorPayload: Partial<Doctor> = {
              noCedula: formValue.noCedula,
              // Se envía el objeto de especialidad completo del formulario.
              especialidad: formValue.especialidad,
              // Se envía el objeto de usuario completo que retornó la primera llamada.
              usuario: updatedUser,
            };
            // ------------------------------------------

            return this.doctorService.update(
              this.doctorId!,
              doctorPayload as Doctor
            );
          })
        )
        .subscribe({
          next: () => {
            this.router.navigate(['/admin/doctores']);
          },
          error: (err) => {
            this.error = 'Ocurrió un error al actualizar. Revise la consola.';
            console.error(err);
          },
        });
    } else {
      // --- INICIO DE LA CORRECCIÓN ---
      // Lógica de creación
      if (!this.tipoUsuarioDoctor) {
        this.error = "No se puede guardar: rol 'Doctor' no definido.";
        return;
      }
      const formValue = this.doctorForm.getRawValue();

      // El backend espera que el objeto 'usuario' venga completo para crearlo,
      // pero para 'especialidad' solo necesita el ID para enlazarla.
      // Un error 500 suele ocurrir si se envía el objeto de especialidad
      // completo, porque JPA intenta crearlo de nuevo en lugar de enlazar
      // el existente, causando un error de constraint.
      const payload = {
        noCedula: formValue.noCedula,
        especialidad: {
          idEspecialidad: formValue.especialidad.idEspecialidad,
        },
        usuario: {
          ...formValue.usuario,
          tipoUsuario: this.tipoUsuarioDoctor,
        },
      };
      // Nos aseguramos de no enviar el idUsuario en la creación
      delete payload.usuario.idUsuario;

      this.doctorService.create(payload as Doctor).subscribe({
        next: () => {
          this.router.navigate(['/admin/doctores']);
        },
        error: (err) => {
          this.error =
            'Ocurrió un error al crear el doctor. Revise la consola.';
          console.error(err);
        },
      });
      // --- FIN DE LA CORRECCIÓN ---
    }
  }
}
