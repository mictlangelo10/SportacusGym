import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClasesService {
  url = 'http://localhost:4000/api/clases';
  constructor(private http: HttpClient) {}

  getProductos() {
    this.http.get(this.url);
  }
}
