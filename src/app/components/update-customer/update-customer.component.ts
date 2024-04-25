import { Component,OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { CustomerService } from '../../service/customer.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.scss']
})
export class UpdateCustomerComponent implements OnInit {
  customerForm=new FormGroup({
    name:new FormControl('',[Validators.required]),
    address:new FormControl('',[Validators.required]),
    salary:new FormControl('',[Validators.required]),
  });

  constructor(private router:Router,private ActivatedRoute:ActivatedRoute,private customerService:CustomerService){
  
  }
  customerList:any[]=[];
  selectedCustomerId:any;
  customer:any;
  ngOnInit(): void {
    this.ActivatedRoute.paramMap.subscribe(response=>{
      this.selectedCustomerId=response.get('id');
      this.customerService.findCustomer(this.selectedCustomerId).subscribe(selectedCustomerData=>{
        this.customer=selectedCustomerData;
        this.customerForm.patchValue({
          name:this.customer.name,
          address:this.customer.address,
          salary:this.customer.salary,
        });
      });
    })
  }
  updateCustomer(){
    let customer={
      name:this.customerForm.get('name')?.value,
      address:this.customerForm.get('address')?.value,
      salary:Number.parseInt(this.customerForm.get('salary')?.value!)
    }
    this.customerService.updateCustomer(this.selectedCustomerId,customer).then(response=>{
      console.log("customer Updated!");
      //this.router.navigate(['/new']);
      this.router.navigateByUrl('/new');
    }).catch(error=>{
      console.log(error);
    })
  }

}
