import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-quantity-modal',
  templateUrl: './product-quantity-modal.component.html',
  styleUrls: ['./product-quantity-modal.component.css'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class ProductQuantityModalComponent {
  cantidad: number = 1;

  constructor(
    public dialogRef: MatDialogRef<ProductQuantityModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddClick(): void {
    this.dialogRef.close(this.cantidad);
  }
}
