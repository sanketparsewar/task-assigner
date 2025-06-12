import { CustomerService } from './../services/customer/customer.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { TaskService } from '../services/task/task.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, CommonModule, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  menuOpen = false;
  constructor(private router: Router) { }
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  isActive(route: string): boolean {
    return window.location.pathname === route;
  }

  logout() {
    localStorage.removeItem('adminToken');
    this.router.navigateByUrl('/admin/auth/login')
  }

}
