import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TaskService } from '../../../admin/services/task/task.service';
import { CustomerService } from '../../../admin/services/customer/customer.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-task',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent implements OnInit {
  @Output() getTask = new EventEmitter()

  showModal = false;
  taskForm!: FormGroup;
  task: any;
  customers: any[] = [];
  constructor(private fb: FormBuilder, private taskService: TaskService, private customerService: CustomerService) { }
  workers = [
    'Alice',
    'Bob',
    'Charlie',
  ];

  ngOnInit() {
    this.getCustomers()
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe({
      next: (customers) => { this.customers = customers },
      error: (error) => console.log(error)
    })
  }

  formatDate = (date: string | Date): string => {
    if (!date) return '';
    return new Date(date).toISOString().split('T')[0]; // Returns "YYYY-MM-DD"
  };

  initializeForm(task: any) {

    const selectedCustomer = this.customers.find(
      (c) => c.name === task.customer?.name && c.number === task.customer?.number
    );

    this.taskForm = this.fb.group({
      id: [task._id],
      title: [task.title || ''],
      description: [task.description || ''],
      dueDate: [this.formatDate(task.dueDate) || ''],
      assignedTo: [task.assignedTo || ''],
      customer: [selectedCustomer || null],
      noOfRolls: [task.noOfRolls || null],
      paymentStatus: [task.paymentStatus || 'Unpaid'],
      areaSize: [task.areaSize || ''],
      roomType: [task.roomType || ''],
      remainingPayment: [task.remainingPayment || null],
      images: [task.images || []],
    });
  }

  openModal(task: any) {
    this.initializeForm(task)
    console.log(this.taskForm.value)
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  updateTask() {
    this.taskService.updateTask(this.taskForm.get('id')!.value, this.taskForm.value).subscribe({
      next: (res) => {
        this.getTask.emit()
        this.closeModal()
        console.log('updated', res)
      }, error: (error) => console.log(error)
    })
  }


}
