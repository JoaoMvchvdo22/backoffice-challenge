import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [];
  private currentId = 1;

  getAll(): Product[] {
    return [...this.products];
  }

  getById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  create(product: Omit<Product, 'id' | 'createdAt'>): Product {
    const newProduct: Product = {
      ...product,
      id: this.currentId++,
      createdAt: new Date()
    };

    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, product: Omit<Product, 'id' | 'createdAt'>): Product | undefined {
    const index = this.products.findIndex(p => p.id === id);

    if (index === -1) {
      return undefined;
    }

    this.products[index] = {
      ...this.products[index],
      ...product
    };

    return this.products[index];
  }

  delete(id: number): boolean {
    const index = this.products.findIndex(p => p.id === id);

    if (index === -1) {
      return false;
    }

    this.products.splice(index, 1);
    return true;
  }

  patchStock(id: number, inStock: boolean): Product | undefined {
    const product = this.getById(id);

    if (!product) {
      return undefined;
    }

    product.inStock = inStock;
    return product;
  }

}
