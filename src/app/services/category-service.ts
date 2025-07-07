import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'https://localhost:44301/api/Categories';

  constructor(private http: HttpClient) {}

 getAll(): Observable<any[]> {
  return this.http.get<any[]>(this.apiUrl);
}

 getById(id: number): Observable<Category> {
  return this.http.get<Category>(`${this.apiUrl}/${id}`);
}

  create(category: Category): Observable<number> {
    return this.http.post<number>(this.apiUrl, category);
  }

  update(id: number, category: Category): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, category);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
