import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { CustomerService } from '../../service/customer.service';


@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.scss']
})
export class NewCustomerComponent implements OnInit{
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
      console.log("Customer Saved!");
    }).catch(error=>{
      console.log(error);
    })
  }

  deleteCustomer(id:any){
    
    if(confirm('are you sure?')){
      this.customerService.deleteCustomer(id).then(response=>{
        console.log("Customer Deleted!");
      }).catch(error=>{
        console.log(error);
      })
    }
  }


}
