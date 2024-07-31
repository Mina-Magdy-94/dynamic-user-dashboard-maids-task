import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

export interface ApiResponse {
  data: User[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

@Injectable({
  providedIn: 'root'
})


export class UserService {
  private apiUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) { }

  getUsers(pageNumber: string | number = 1): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}?page=${pageNumber}`);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
}
