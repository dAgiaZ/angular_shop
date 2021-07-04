import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getProducts(params?: any): Observable<any> {
    if (typeof params === 'string') {
      return this.http.get<Observable<any>>(`${this.apiUrl}/products?${params}`);
    } else {
      return this.http.get<Observable<any>>(`${this.apiUrl}/products`, { params, observe: 'response' });
    }
  }

}
