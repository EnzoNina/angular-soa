import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-product-stock-modal',
  templateUrl: './product-stock-modal.component.html',
  styleUrls: ['./product-stock-modal.component.css'],
  imports: [MatFormFieldModule, MatInputModule, CommonModule, FormsModule]
})
export class ProductStockModalComponent {
  cantidad: number = 0;

  constructor(
    public dialogRef: MatDialogRef<ProductStockModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddClick(): void {
    this.dialogRef.close({ action: 'add', cantidad: this.cantidad });
  }

  onReduceClick(): void {
    this.dialogRef.close({ action: 'reduce', cantidad: this.cantidad });
  }
}
