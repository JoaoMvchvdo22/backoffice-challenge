import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  //private apiUrl: string = 'https://api.com/products';

  private products: Product[] = [];
  private currentId = 1;

  constructor(private http: HttpClient) { }

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

  // getAll(): Observable<Product[]> {
  //   return this.http.get<Product[]>(this.apiUrl);
  // }

  // getById(id: number): Observable<Product> {
  //   return this.http.get<Product>(`${this.apiUrl}/${id}`);
  // }

  // create(product: Product): Observable<Product> {
  //   return this.http.post<Product>(this.apiUrl, product);
  // }

  // update(id: number, product: Product): Observable<Product> {
  //   return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  // }

  // delete(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`);
  // }

  // patchStock(id: number, inStock: boolean): Observable<Product> {
  //   return this.http.patch<Product>(`${this.apiUrl}/${id}`, { inStock });
  // }

}
