import { HttpService } from './../http/http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpService: HttpService) { }

  createTask(data: any) {
    return this.httpService.post('task', data)
  }
  getTasks() {
    return this.httpService.get('task')
  }
  getTaskById(id: string) {
    return this.httpService.get(`task/${id}`)
  }
  deleteTask(id: string) {
    return this.httpService.delete(`task/${id}`)
  }
}
