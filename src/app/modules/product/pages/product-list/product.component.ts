import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../core/interfaces/product.interface';
import { ProductService } from '../../../../core/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductFormComponent } from '../../components/product-form/product-form.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  displayedColumns: string[] = ['name', 'price', 'inStock', 'actions'];
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.products = this.productService.getAll();
  }

  deleteProduct(id: number): void {
    const deleted = this.productService.delete(id);

    if (deleted) {
      this.snackBar.open('Produto removido com sucesso', 'Fechar', {
        duration: 3000
      });
      this.loadProducts();
    }
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(ProductFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProducts();
      }
    });
  }

  openEditDialog(product: Product): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProducts();
      }
    });
  }

  updateStock(id: number, inStock: boolean): void {
    this.productService.patchStock(id, inStock);
    this.loadProducts();
  }

}
