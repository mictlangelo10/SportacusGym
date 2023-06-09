import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { clases } from '../models/clases';

@Injectable({
  providedIn: 'root',
})
export class ClasesService {
  url = 'http://localhost:4000/api/clases';
  constructor(private http: HttpClient) {}

  getClases(): Observable<any> {
    return this.http.get(this.url);
  }

  eliminarClase(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  guardarClase(clases: clases): Observable<any> {
    return this.http.post(this.url, clases);
  }
}
