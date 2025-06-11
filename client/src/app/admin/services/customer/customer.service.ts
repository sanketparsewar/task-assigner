import { BehaviorSubject, of, tap } from 'rxjs';
import { HttpService } from './../http/http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpService: HttpService) { }
  private customerSubject = new BehaviorSubject<any>([])
  public $customers = this.customerSubject.asObservable()

  createCustomer(data: any) {
    this.setCustomers(null)
    return this.httpService.post('customer', data)
  }

  getCustomers() {
    const currentData = this.customerSubject.getValue();
    if (currentData && currentData.length > 0) {
      return of(currentData);
    }
    return this.httpService.get('customer').pipe(
      tap((res) => this.setCustomers(res))
    )
  }

  setCustomers(data: any) {
    this.customerSubject.next(data)
  }

}
