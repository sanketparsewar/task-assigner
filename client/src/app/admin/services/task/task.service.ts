import { HttpParams } from '@angular/common/http';
import { HttpService } from './../http/http.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private httpService: HttpService) { }
  private tasksSubject = new BehaviorSubject<any>([]);
  public $tasks = this.tasksSubject.asObservable();
  lastQuery: any;
  createTask(data: any) {
    this.setTasks(null)
    return this.httpService.post('task', data);
  }

  getTasks(query?: {
    sortOrder?: string;
    searchQuery?: string;
    filterCondition?: string;
  }) {
    const currentData = this.tasksSubject.getValue();

    // ✅ Compare with last query
    const isSameQuery = JSON.stringify(this.lastQuery) === JSON.stringify(query);

    if (currentData && currentData.length > 0 && isSameQuery) {
      return of(currentData);
    }

    // Save the current query
    this.lastQuery = { ...query };

    // Construct HttpParams
    let params = new HttpParams();
    if (query?.sortOrder) {
      params = params.set('sortOrder', query.sortOrder);
    }
    if (query?.searchQuery) {
      params = params.set('searchQuery', query.searchQuery);
    }
    if (query?.filterCondition) {
      params = params.set('filterCondition', query.filterCondition);
    }

    return this.httpService.get('task', { params }).pipe(
      tap((data) => this.setTasks(data))
    );
  }


  getTaskById(id: string) {
    return this.httpService.get(`task/${id}`);
  }

  updateTask(id: string, data: any) {
    this.setTasks(null)
    return this.httpService.put(`task/${id}`, data);
  }

  deleteTask(id: string) {
    this.setTasks(null)
    return this.httpService.delete(`task/${id}`);
  }

  setTasks(data: any) {
    this.tasksSubject.next(data);
  }
}
