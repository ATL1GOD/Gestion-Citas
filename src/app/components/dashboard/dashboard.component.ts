import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container-fluid p-4">
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Panel de Control</h1>
      </div>

      <div class="row mb-4">
        <div class="col-lg-7">
          <div class="card shadow h-100">
            <div class="card-body">
              <h2 class="card-title">¡Bienvenido al Sistema!</h2>
              <p class="lead">
                Sistema de Gestión de la Clínica Salud. Desde aquí puede
                administrar citas, pacientes y mucho más.
              </p>
              <p>
                Revisa lass citas de hoy y accede a los módulos de agendamiento
                y clínico para gestionar la información.
              </p>
              <a routerLink="/citas" class="btn btn-info">Ver Citas de Hoy</a>
            </div>
          </div>
        </div>
        <div class="col-lg-5 d-none d-lg-block">
          <div class="card shadow h-100">
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop"
              class="img-fluid h-100"
              style="object-fit: cover; border-radius: 0.35rem;"
              alt="Personal médico usando una tablet"
            />
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .card .border-left-primary {
        border-left: 0.25rem solid #4e73df !important;
      }
      .card .border-left-success {
        border-left: 0.25rem solid #1cc88a !important;
      }
      .text-gray-300 {
        color: #dddfeb !important;
      }
    `,
  ],
})
export class DashboardComponent {}
