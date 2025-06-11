import { TaskService } from './admin/services/task/task.service';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { CustomerService } from './admin/services/customer/customer.service';

@Component({
  selector: 'app-root',
  imports: [LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';

  constructor(private taskService: TaskService, private CustomerService: CustomerService) {
    // this.getCustomers()
  }

  getCustomers() {
    this.CustomerService.getCustomers().subscribe({
      next: (data) => {
        console.log('customers', data)
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
