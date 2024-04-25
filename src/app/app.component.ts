import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { CustomerService } from './service/customer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  customerForm=new FormGroup({
    name:new FormControl('',[Validators.required]),
    address:new FormControl('',[Validators.required]),
    salary:new FormControl('',[Validators.required]),
  });

  constructor(private customerService:CustomerService){
  
  }
  customerList:any[]=[];

  ngOnInit(): void {
    this.customerService.loadAll().subscribe((data)=>{
      this.customerList=data.map((e:any)=>{
        return {
          id:e.payload.doc.id,
          ...e.payload.doc.data()
        }
      })
    })
  }




  saveCustomer(){
    let customer={
      name:this.customerForm.get('name')?.value,
      address:this.customerForm.get('address')?.value,
      salary:Number.parseInt(this.customerForm.get('salary')?.value!)
    }
    this.customerService.createCustomer(customer).then(response=>{
      console.log("customer Saved!");
    }).catch(error=>{
      console.log(error);
    })
  }
}
