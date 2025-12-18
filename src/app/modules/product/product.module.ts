import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './pages/product-list/product.component';
import { ProductRoutingModule } from './product-routing.module';
import { MaterialModule } from '../../shared/material.module';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [ProductComponent, ProductFormComponent]
})
export class ProductModule { }
