import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecepcionistaService, RecepcionistaCreatePayload } from '../../services/recepcionista.service';
import { HorarioService } from '../../services/horario.service';
import { ConsultorioService } from '../../services/consultorio.service';
import { Horario } from '../../models/horario.model';
import { Consultorio } from '../../models/consultorio.model';

@Component({
  selector: 'app-recepcionista-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './recepcionista-form.component.html',
  styleUrl: './recepcionista-form.component.css'
})
export class RecepcionistaFormComponent implements OnInit {
  
  recepcionistaForm!: FormGroup;
  isEditMode = false;
  recepcionistaId: number | null = null;
  horarios: Horario[] = [];
  consultorios: Consultorio[] = [];
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private recepcionistaService: RecepcionistaService,
    private horarioService: HorarioService,
    private consultorioService: ConsultorioService,
  ) {}

  ngOnInit(): void {
    this.recepcionistaForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidoPat: ['', Validators.required],
      apellidoMat: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      contrasena: [''],
      horarioId: [null, Validators.required],
      consultorioId: [null, Validators.required],
    });
    
    this.cargarDatosDeApoyo();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.recepcionistaId = +id;
      this.recepcionistaForm.get('contrasena')?.setValidators(null);
      this.cargarDatosRecepcionista(this.recepcionistaId);
    } else {
       this.recepcionistaForm.get('contrasena')?.setValidators([Validators.required, Validators.minLength(6)]);
    }
  }
  
  cargarDatosDeApoyo(): void {
    this.consultorioService.getAll().subscribe(data => this.consultorios = data);
    this.horarioService.getAll().subscribe(data => {
      // Filtramos para obtener solo horarios de tipo "rango" para los turnos
      this.horarios = data.filter(h => h.horaInicio && h.horaFin);
    });
  }

  cargarDatosRecepcionista(id: number): void {
    this.recepcionistaService.getById(id).subscribe({
      next: (data) => {
        this.recepcionistaForm.patchValue({
          nombre: data.usuario.nombre,
          apellidoPat: data.usuario.apellidoPat,
          apellidoMat: data.usuario.apellidoMat,
          email: data.usuario.email,
          telefono: data.usuario.telefono,
          horarioId: data.horario.id,
          consultorioId: data.consultorio.id,
        });
      },
      error: (err) => this.error = "No se pudo cargar la información del recepcionista."
    });
  }

  onSubmit(): void {
    if (this.recepcionistaForm.invalid) {
      this.recepcionistaForm.markAllAsTouched();
      return;
    }
    
    // El backend espera un payload específico (un Map), por lo que lo construimos.
    const payload: RecepcionistaCreatePayload | any = this.recepcionistaForm.value;

    if (this.isEditMode) {
        if (!payload.contrasena) delete payload.contrasena; // No enviar contraseña si está vacía
        
        this.recepcionistaService.update(this.recepcionistaId!, payload).subscribe({
            next: () => this.router.navigate(['/admin/recepcionistas']),
            error: (err) => this.error = "Error al actualizar el recepcionista."
        });
    } else {
        this.recepcionistaService.create(payload).subscribe({
            next: () => this.router.navigate(['/admin/recepcionistas']),
            error: (err) => this.error = "Error al crear el recepcionista."
        });
    }
  }
}