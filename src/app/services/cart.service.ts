import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getCart(userId: number = 1, params?: any): Observable<Cart> {
    return this.http.get<Cart>(`${this.apiUrl}/carts/${userId}`, { params });
  }

  updateCart(userId: number = 1, params: Cart): Observable<Cart> {
    return this.http.put<Cart>(`${this.apiUrl}/carts/${userId}`, params);
  }
}
