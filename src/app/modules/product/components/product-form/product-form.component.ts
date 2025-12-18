import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../../core/services/product.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../../../core/interfaces/product.interface';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  form!: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: Product
  ) {}

  ngOnInit(): void {
    this.isEditMode = !!this.data;

    this.form = this.fb.group({
      name: [this.data?.name || '', Validators.required],
      price: [this.data?.price || 0, [Validators.required, Validators.min(0)]],
      inStock: [this.data?.inStock ?? true]
    });
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }

    if (this.isEditMode && this.data) {
      this.productService.update(this.data.id, this.form.value);
    } else {
      this.productService.create(this.form.value);
    }

    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

}
