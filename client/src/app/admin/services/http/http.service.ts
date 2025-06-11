import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  private API_URL = 'http://localhost:8000'

  get(endPoint: string,option?:any): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${endPoint}`,option);
  }
  post(endPoint: string, data: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/${endPoint}`, data);
  }
  put(endPoint: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/${endPoint}`, data);
  }
  delete(endPoint: string): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${endPoint}`);
  }

}
