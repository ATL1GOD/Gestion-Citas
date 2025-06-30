import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { HistorialClinico } from '../../models/historial-clinico.model';
import { HistorialClinicoService } from '../../services/historial-clinico.service';
import { saveAs } from 'file-saver'; // Se necesita: npm install file-saver

@Component({
  selector: 'app-historial-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './historial-detail.component.html',
  styleUrl: './historial-detail.component.css'
})
export class HistorialDetailComponent implements OnInit {

  historial: HistorialClinico | null = null;
  historialId!: number;
  selectedFile: File | null = null;
  error: string | null = null;
  success: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private historialService: HistorialClinicoService
  ) {}

  ngOnInit(): void {
    this.historialId = +this.route.snapshot.paramMap.get('id')!;
    this.cargarHistorial();
  }

  cargarHistorial(): void {
    this.historialService.getById(this.historialId).subscribe({
      next: data => this.historial = data,
      error: err => this.error = "No se pudo cargar el historial."
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.success = null;
      this.error = null;
    }
  }

  onUpload(): void {
    if (!this.selectedFile) {
      this.error = "Por favor, seleccione un archivo primero.";
      return;
    }

    this.historialService.uploadFile(this.historialId, this.selectedFile).subscribe({
      next: (response) => {
        this.success = response.mensaje || "Archivo subido con éxito.";
        this.selectedFile = null;
        this.cargarHistorial(); // Recargar para mostrar el enlace de descarga
      },
      error: (err) => this.error = "Error al subir el archivo."
    });
  }

  onDownload(): void {
    if (this.historial?.archivoAdjuntoPath) {
      this.historialService.downloadFile(this.historialId).subscribe({
        next: (blob) => {
          saveAs(blob, "Archivo_Adjunto.png");
        },
        error: (err) => this.error = "No se pudo descargar el archivo."
      });
    }
  }
}
