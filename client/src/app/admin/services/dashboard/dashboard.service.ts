import { BehaviorSubject, of, tap } from 'rxjs';
import { HttpService } from './../http/http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpService: HttpService) { }

  private dashBoardSubject = new BehaviorSubject<any>({})
  public $dashBoard = this.dashBoardSubject.asObservable()

  getDashboardData() {
    const dashboardData = this.dashBoardSubject.getValue()
    if (dashboardData && Object.keys(dashboardData).length > 0) {
      return of(dashboardData)
    }
    return this.httpService.get('dashboard').pipe(
      tap((data) => this.setDashBoard(data))
    )
  }

  setDashBoard(data: any) {
    this.dashBoardSubject.next(data)
  }

}
