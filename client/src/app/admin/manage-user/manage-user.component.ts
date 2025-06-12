import { Component } from '@angular/core';
import { WorkerTableComponent } from '../../shared/components/worker-table/worker-table.component';
import { CustomerTableComponent } from '../../shared/components/customer-table/customer-table.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-user',
  imports: [WorkerTableComponent, CustomerTableComponent,CommonModule],
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.css'
})
export class ManageUserComponent {
  toggle: string = 'customer'
  constructor() { }

  toggleOption(option:string) {
    this.toggle = option;
  }

}
