import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-envio-modal',
  templateUrl: './envio-modal.component.html',
  styleUrls: ['./envio-modal.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogClose]
})
export class EnvioModalComponent {
  envioForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EnvioModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.envioForm = this.fb.group({
      pedidoId: [data.pedidoId, Validators.required],
      usuarioId: [data.usuarioId, Validators.required],
      direccionDestino: [data.direccionDestino, Validators.required],
      transportista: ['', Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.envioForm.valid) {
      this.dialogRef.close(this.envioForm.value);
    }
  }
}