import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { LoginComponent } from './login/login.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { NotfoundComponent } from './notfound/notfound.component';


const routes: Routes = [
  {path:'',redirectTo:'login', pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:EmployeeDashboardComponent},
  {path:'manage',component:ManageUserComponent},
  {path:'**',component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
