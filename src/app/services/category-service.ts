import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { map, Observable } from 'rxjs';
import { PaginatedResult } from '../models/PaginatedResult';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'https://localhost:44301/api/Categories';

  constructor(private http: HttpClient) {}

getPaginated(
    page: number,
    size: number,
    search: string = '',
    sortBy: string = '',
    isDescending: boolean = false
  ): Observable<PaginatedResult<Category>> {
    let params = new HttpParams()
      .set('pageNumber', page)
      .set('pageSize', size)
      .set('search', search)
      .set('sortBy', sortBy)
      .set('isDescending', isDescending);

    return this.http.get<PaginatedResult<Category>>(this.apiUrl, { params });
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
