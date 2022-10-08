import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import {MatNativeDateModule} from '@angular/material/core';
import {MaterialExampleModule} from '../material.module';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { NotfoundComponent } from './notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeDashboardComponent,
    LoginComponent,
    ManageUserComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ToastrModule.forRoot({
      progressBar:true,
      preventDuplicates:true,
      closeButton:true
    }),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
