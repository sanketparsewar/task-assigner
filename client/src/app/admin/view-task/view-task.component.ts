import { TaskService } from './../services/task/task.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-view-task',
  imports: [CommonModule, RouterLink, FormsModule],
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
  //       phone: '1234567890',
  //       address: '123 Main St, Springfield'
  //     },
  //     customerName: 'John Doe',
  //     customerPhone: '1234567890',
  //     customerAddress: '123 Main St, Springfield',
  //     noOfRolls: 5,
  //     paymentStatus: 'Unpaid',
  //     areaSize: 250,
  //     roomType: 'Living Room',
  //     remainingPayment: 100,
  //     completed: true,
  //   },
  // ];
  tasks: any[] = [];

  query = {
    searchQuery: '',
    sortOrder: 'desc',
    filterCondition: 'all',
  };

  private searchSubject = new Subject<string>();

  constructor(private taskService: TaskService) {
    this.getTasks();
  }

  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(500) // adjust debounce time as needed
    ).subscribe(() => {
      this.getTasks();
    });
  }

  search(event: any) {
    this.searchSubject.next(event.target.value);
  }

  filterChange(event: any) {
    this.getTasks(); // no debounce needed for dropdowns
  }

  getTasks() {
    this.taskService.getTasks(this.query).subscribe({
      next: (data) => {
        this.tasks = data;
        
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}
