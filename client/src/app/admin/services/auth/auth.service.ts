import { tap } from 'rxjs';
import { HttpService } from './../http/http.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpService: HttpService,private router:Router) { }

  register(data: any) {
    return this.httpService.post('user/adminregister', data)
  }
  login(data: any) {
    return this.httpService.post('user/adminlogin', data).pipe(
      tap((data) => {
        localStorage.setItem('adminToken', data.token)
        this.router.navigateByUrl('admin/tasks')
      })
    );
  }
}
