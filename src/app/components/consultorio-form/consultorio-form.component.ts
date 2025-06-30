import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ConsultorioService } from '../../services/consultorio.service';
import { EstatusService } from '../../services/estatus.service';
import { Estatus } from '../../models/estatus.model';

@Component({
  selector: 'app-consultorio-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './consultorio-form.component.html',
  styleUrl: './consultorio-form.component.css'
})
export class ConsultorioFormComponent implements OnInit {

  consultorioForm!: FormGroup;
  isEditMode = false;
  consultorioId: number | null = null;
  estatusLista: Estatus[] = [];
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private consultorioService: ConsultorioService,
    private estatusService: EstatusService
  ) {}

  ngOnInit(): void {
    this.cargarEstatus();
    
    this.consultorioForm = this.fb.group({
      numero: ['', Validators.required],
      piso: ['', Validators.required],
      descripcion: [''],
      estatus: [null, Validators.required]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.consultorioId = +id;
      this.cargarDatosConsultorio(this.consultorioId);
    }
  }

  cargarEstatus(): void {
    this.estatusService.getAll().subscribe(data => this.estatusLista = data);
  }

  cargarDatosConsultorio(id: number): void {
    this.consultorioService.getById(id).subscribe({
      next: (data) => {
        // Para que el select se pueble correctamente, buscamos el objeto Estatus
        // en nuestra lista y lo asignamos al control del formulario.
        const estatusSeleccionado = this.estatusLista.find(e => e.idEstado === data.estatus.idEstado);
        this.consultorioForm.patchValue({
            ...data,
            estatus: estatusSeleccionado
        });
      },
      error: (err) => this.error = "No se pudo cargar el consultorio."
    });
  }

  // Compara los objetos Estatus en el <select>
  compareEstatus(e1: Estatus, e2: Estatus): boolean {
    return e1 && e2 ? e1.idEstado === e2.idEstado : e1 === e2;
  }

  onSubmit(): void {
    if (this.consultorioForm.invalid) {
      this.consultorioForm.markAllAsTouched();
      return;
    }
    
    const operation = this.isEditMode
      ? this.consultorioService.update(this.consultorioId!, this.consultorioForm.value)
      : this.consultorioService.create(this.consultorioForm.value);

    operation.subscribe({
      next: () => this.router.navigate(['/admin/consultorios']),
      error: (err) => this.error = `Error al ${this.isEditMode ? 'actualizar' : 'crear'} el consultorio.`
    });
  }
}