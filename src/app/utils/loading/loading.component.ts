import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  template: `
    <div class="loading-container">
      <mat-spinner></mat-spinner>
      <p>Cargando...</p>
    </div>
  `,
  styles: [`
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      text-align: center;
    }
  `],
  standalone: true,
  imports: [MatProgressSpinnerModule]
})
export class LoadingComponent {}