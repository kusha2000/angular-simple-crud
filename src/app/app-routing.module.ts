import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateCustomerComponent } from './components/update-customer/update-customer.component';
import { NewCustomerComponent } from './components/new-customer/new-customer.component';

const routes: Routes = [
  {path:'',redirectTo:'/new',pathMatch:'full'},
  {path:'new',component:NewCustomerComponent},
  {path:'update/:id',component:UpdateCustomerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
