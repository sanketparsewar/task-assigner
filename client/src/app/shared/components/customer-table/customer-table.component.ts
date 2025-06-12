import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../../../admin/services/customer/customer.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-table',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './customer-table.component.html',
  styleUrl: './customer-table.component.css'
})
export class CustomerTableComponent {
  customers: any;
  customerForm!: FormGroup;
  showAddCustomer: boolean = false;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z ]+$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: ['', [Validators.required, Validators.minLength(3)]]
    });
    this.getCustomers();
  }
  getCustomers() {
    this.customerService.getCustomers().subscribe({
      next: (data) => {
        this.customers = data;
      },
      error: (error) => console.log(error),
    });
  }

  addCustomer() {
    this.customerService.createCustomer(this.customerForm.value).subscribe({
      next: (res) => {
        console.log('customer added')
        this.customerForm.reset()
        this.getCustomers()
      },
      error: (err) => console.log('error adding customer', err),
    });
  }
}
