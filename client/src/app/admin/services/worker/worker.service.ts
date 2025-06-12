import { BehaviorSubject, of, tap } from 'rxjs';
import { HttpService } from './../http/http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  constructor(private httpService: HttpService) { }
  private workersSubject = new BehaviorSubject<any>([])
  public $workers = this.workersSubject.asObservable()

  getWorkerList() {
    const workersData = this.workersSubject.getValue()
    if (workersData && workersData.length > 0) {
      return of(workersData)
    }
    return this.httpService.get('user/worker').pipe(
      tap((data) => this.setWorkers(data))
    );
  }

  addWorker(data: any) {
    this.setWorkers(null)
    return this.httpService.post('user/workerregister', data)
  }
  
  deleteWorker(id: string) {
    this.setWorkers(null)
    return this.httpService.delete(`user/${id}`)
  }

  setWorkers(data: any) {
    this.workersSubject.next(data)
  }

}
