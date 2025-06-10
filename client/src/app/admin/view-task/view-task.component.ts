import { TaskService } from './../services/task/task.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-task',
  imports: [CommonModule,RouterLink],
  templateUrl: './view-task.component.html',
  styleUrl: './view-task.component.css'
})
export class ViewTaskComponent implements OnInit {
  // tasks = [
  //   { id:'1',
  //     title: 'Paint Wall',
  //     description: 'Painting the living room wall',
  //     dueDate: '2023-10-15',
  //     assignedTo: 'Alice',
  //     customer: {
  //       name: 'John Doe',
  //       number: '1234567890',
  //       address: '123 Main St, Springfield'
  //     },
  //     customerName: 'John Doe',
  //     customerNumber: '1234567890',
  //     customerAddress: '123 Main St, Springfield',
  //     noOfRolls: 5,
  //     paymentStatus: 'Unpaid',
  //     areaSize: 250,
  //     roomType: 'Living Room',
  //     remainingPayment: 100,
  //     completed: true,
  //   },
  //   { id:'2',
  //     title: 'Fix Pipe',
  //     description: 'Repairing the kitchen sink pipe',
  //     dueDate: '2023-10-10',
  //     assignedTo: 'Bob',
  //     customer: {
  //       name: 'Jane Smith',
  //       number: '9876543210',
  //       address: '456 Elm St, Springfield'
  //     },
  //     customerName: 'Jane Smith',
  //     customerNumber: '9876543210',
  //     customerAddress: '456 Elm St, Springfield',
  //     noOfRolls: null,
  //     paymentStatus: 'Completed',
  //     areaSize: null,
  //     roomType: 'Kitchen',
  //     remainingPayment: 0,
  //     completed: false,
  //   }
  // ];
  tasks: any[]=[];

  constructor(private taskservice:TaskService){this.taskservice.getTasks().subscribe({
    next: (data) => {
      this.tasks = data;
      console.log(this.tasks)
    }
  })}

  ngOnInit() {
    
  }


}
