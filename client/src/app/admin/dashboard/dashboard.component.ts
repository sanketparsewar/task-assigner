import { DashboardService } from './../services/dashboard/dashboard.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  dashboardData:any;
  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getDashboardData()
  }
  getDashboardData() {
    this.dashboardService.getDashboardData().subscribe({
      next: (data) => {
        this.dashboardData=data
      },
      error: (error) => console.log(error)
    })
  }



}
