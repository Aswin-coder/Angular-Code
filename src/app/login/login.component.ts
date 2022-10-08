import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CurrentUser } from '../manage-user/employee-dash board.model';
import {SharedService} from '../shared/shared.service'
import { ApiService } from '../shared/api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  

  public loginForm!: FormGroup
  formValue !: FormGroup;
  
  constructor(private shared:SharedService,private api:ApiService, private formBuilder:FormBuilder,private http:HttpClient,private router:Router,private toastr: ToastrService) { }
  cname='';
  cadmin!:boolean
  clogin!:boolean
  currentobj : CurrentUser = new CurrentUser();
  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }
  
  login(){
    this.http.get<any>("http://localhost:8080/api/data/user") 
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        this.currentobj.clogin=true;
      this.currentobj.cname=a.name;
      this.currentobj.cadmin=a.admin;
        this.shared.setMessage(this.currentobj.cname)
        return a.email===this.loginForm.value.email && a.password===this.loginForm.value.password
      });
    if(user){
      this.toastr.success("Logged in as "+this.currentobj.cname);
      
      this.api.postCurrent(this.currentobj,1)
    .subscribe(res=>{
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
    })
      this.loginForm.reset();
      this.router.navigate(['dashboard'])
    }else{
      this.toastr.error('Try again or contact Admin!!','Invalid Login');
    }
  },err=>{
    this.toastr.warning("Something went wrong!!")

  })
  
}

}
