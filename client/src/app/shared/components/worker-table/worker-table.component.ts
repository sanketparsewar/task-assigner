import { WorkerService } from './../../../admin/services/worker/worker.service';
import { CommonModule } from '@angular/common';
import { DashboardService } from './../../../admin/services/dashboard/dashboard.service';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-worker-table',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './worker-table.component.html',
  styleUrl: './worker-table.component.css',
})
export class WorkerTableComponent {
  workers: any;
  workerForm!: FormGroup;
  showAddWorker: boolean = false;

  constructor(
    private fb: FormBuilder,
    private workerService: WorkerService
  ) { }

  ngOnInit() {
    this.workerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z ]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/)
      ]],
    });
    this.getWorkers();
  }
  getWorkers() {
    this.workerService.getWorkerList().subscribe({
      next: (data) => {
        this.workers = data;
      },
      error: (error) => console.log(error),
    });
  }

  addWorker() {
    this.workerService.addWorker(this.workerForm.value).subscribe({
      next: (res) => {
        console.log('worker added')
        this.workerForm.reset()
        this.getWorkers()
      },
      error: (err) => console.log('error adding worker', err),
    });
  }

  deleteWorker(id: string) {
    this.workerService.deleteWorker(id).subscribe({
      next: (res) => {
        console.log('worker deleted')
        this.getWorkers()
      },
      error: (err) => console.log('error adding worker', err),
    });
  }

}
