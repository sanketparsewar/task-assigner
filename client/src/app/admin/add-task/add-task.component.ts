import { CustomerService } from './../services/customer/customer.service';
import { TaskService } from './../services/task/task.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent implements OnInit {
  task = {
    title: '',
    description: '',
    dueDate: '',
    assignedTo: '',
    customer: {},
    noOfRolls: null,
    paymentStatus: 'Unpaid',
    areaSize: '',
    roomType: '',
    remainingPayment: null,
    images: [],
  };

  customers: any[] = [];
  constructor(private taskService: TaskService, private customerService: CustomerService) { }
  workers = [
    'Alice',
    'Bob',
    'Charlie',
  ];

  ngOnInit() {
    this.customerService.getCustomers().subscribe({
      next: (customers) => this.customers = customers,
      error: (error) => console.log(error)
    })
  }


  addTask() {
    this.taskService.createTask(this.task).subscribe({
      next: () => {
        console.log('Task submitted:', this.task)
        this.reset()
      },
      error: (error) => console.log('error submitted:', error)
    })

  }
  reset() {
    this.task = {
      title: '',
      description: '',
      dueDate: '',
      assignedTo: '',
      customer: {
      },
      noOfRolls: null,
      paymentStatus: 'Unpaid',
      areaSize: '',
      roomType: '',
      remainingPayment: null,
      images: [],
    };
  }
}
