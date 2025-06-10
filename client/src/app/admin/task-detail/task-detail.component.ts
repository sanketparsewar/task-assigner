import { TaskService } from './../services/task/task.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-detail',
  imports: [CommonModule],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent {
  // task = {
  //   id: '1',
  //   title: 'Paint Wall',
  //   description: 'Painting the living room wall',
  //   dueDate: '2023-10-15',
  //   assignedTo: 'Alice',
  //   customer: {
  //     name: 'John Doe',
  //     number: '1234567890',
  //     address: '123 Main St, Springfield'
  //   },
  //   noOfRolls: 5,
  //   paymentStatus: 'Unpaid',
  //   areaSize: 250,
  //   roomType: 'Living Room',
  //   remainingPayment: 100,
  //   completedDate: '2023-10-15',
  //   completed: true,
  //   status: 'Pending'
  // };
  task: any;

  constructor(private taskService: TaskService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.params.subscribe((param) => {
      if (param['id'])
        this.taskService.getTaskById(param['id']).subscribe({
          next: (data) => {
            this.task = data
            console.log(data)
          }, error: (error) => {
            console.log(error)
          }
        })
    })
  }
  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe({
      next: (res) => {
        console.log('deleted')
        this.router.navigate(['admin', 'tasks'])
      },
      error: (error) => {
        console.log(error)
      }
    })

  }
}
