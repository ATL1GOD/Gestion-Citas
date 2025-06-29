import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container-fluid">
      <h1 class="mt-4">Dashboard</h1>
      <p class="lead mb-4">Bienvenido al Sistema de Gestión de la Clínica Salud.</p>
      
      <div class="row">
        <div class="col-xl-3 col-md-6 mb-4">
          <div class="card border-left-primary shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs fw-bold text-primary text-uppercase mb-1">Agendar Cita</div>
                  <div class="h5 mb-0 fw-bold text-gray-800">Nueva Consulta</div>
                </div>
                <div class="col-auto">
                  <i class="bi bi-calendar-plus-fill fs-2 text-gray-300"></i>
                </div>
              </div>
              <a routerLink="/citas/nuevo" class="stretched-link"></a>
            </div>
          </div>
        </div>

        <div class="col-xl-3 col-md-6 mb-4">
          <div class="card border-left-success shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs fw-bold text-success text-uppercase mb-1">Ver Pacientes</div>
                  <div class="h5 mb-0 fw-bold text-gray-800">Administrar</div>
                </div>
                <div class="col-auto">
                  <i class="bi bi-people-fill fs-2 text-gray-300"></i>
                </div>
              </div>
              <a routerLink="/admin/pacientes" class="stretched-link"></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card .border-left-primary { border-left: .25rem solid #4e73df !important; }
    .card .border-left-success { border-left: .25rem solid #1cc88a !important; }
    .text-gray-300 { color: #dddfeb !important; }
  `]
})
export class DashboardComponent {

}