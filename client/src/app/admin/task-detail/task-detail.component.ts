import { TaskService } from './../services/task/task.service';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditTaskComponent } from '../../shared/components/edit-task/edit-task.component';

@Component({
  selector: 'app-task-detail',
  imports: [CommonModule, EditTaskComponent],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css',
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
  @ViewChild(EditTaskComponent) editTaskComponent!: EditTaskComponent;

  task: any;
  taskId: string = ''
  constructor(
    private taskService: TaskService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe((param) => {
      if (param['id']) {
        this.taskId = param['id'];
        this.getTask()
      }
    });
  }


  getTask() {
    this.taskService.getTaskById(this.taskId).subscribe({
      next: (data) => {
        this.task = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  openEditTaskModal(task: any) {
    this.editTaskComponent.openModal(task);
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe({
      next: (res) => {
        console.log('deleted');
        this.router.navigate(['admin', 'tasks']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  back() {
    history.back();
  }
}
