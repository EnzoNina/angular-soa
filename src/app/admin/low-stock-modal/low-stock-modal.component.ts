import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-low-stock-modal',
  templateUrl: './low-stock-modal.component.html',
  styleUrls: ['./low-stock-modal.component.css'],
  imports: [NgFor]
})
export class LowStockModalComponent {
  constructor(
    public dialogRef: MatDialogRef<LowStockModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
