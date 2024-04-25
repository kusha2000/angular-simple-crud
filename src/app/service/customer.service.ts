import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private firestore:AngularFirestore) { }

  createCustomer(customer:any):Promise<any>{
    return this.firestore.collection('customers').add(customer);
  }
}
