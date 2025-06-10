import { HttpService } from './../http/http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpService: HttpService) { }

  createCustomer(data: any) {
    return this.httpService.post('customer', data)
  }
  getCustomers() {
    return this.httpService.get('customer')
  }
}
