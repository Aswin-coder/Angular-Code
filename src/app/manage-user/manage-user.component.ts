import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dash board.model';
import { SharedService} from '../shared/shared.service';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/shared/tutorial.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

  message:any | undefined
  formValue !: FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel();

  employeeData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  current:string | undefined;

  tutorials?: Tutorial[];
  tutorialsAdmin?: Tutorial[];
  tutorialsHr?: Tutorial[];
  tutorialsCurrent?: Tutorial[];
  currentIndex = -1;
  title = '';

  
  
  constructor(private tutorialService: TutorialService,private shared:SharedService, private formbuilder: FormBuilder,private api:ApiService,private toastr: ToastrService) { }
  
  ngOnInit(): void {
    this.retrieveTutorials();
    this.retrieveTutorialsHr();
    this.retrieveTutorialsAdmin();
    
    this.formValue = this.formbuilder.group({
      eid : [''],
      name : [''],
      email : [''],
      admin : [''],
      password : ['']
    })
    this.getAllEmployee();
    this.current=this.shared.getMessage()
  }


 

  retrieveTutorials(): void {
    this.tutorialService.getAll()
      .subscribe({
        next: (data) => {
          this.tutorials = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }


  retrieveTutorialsAdmin(): void {
    this.tutorialService.getAllAdmin()
      .subscribe({
        next: (data) => {
          this.tutorialsAdmin = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }






  retrieveTutorialsHr(): void {
    this.tutorialService.getAllHr()
      .subscribe({
        next: (data) => {
          this.tutorialsHr = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }


  refreshList(): void {
    this.retrieveTutorials();
    this.retrieveTutorialsAdmin();
    this.retrieveTutorialsHr();
    this.currentIndex = -1;
  }

  
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
  postEmployeeDetails(){
    this.employeeModelObj.eid=this.formValue.value.eid;
    this.employeeModelObj.name=this.formValue.value.name;
    this.employeeModelObj.email=this.formValue.value.email;
    this.employeeModelObj.admin=this.formValue.value.admin;
    this.employeeModelObj.password=this.formValue.value.password;
    
    
    this.api.postEmployee(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res);
      this.toastr.success(this.employeeModelObj.name+" Added Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.refreshList();
      this.getAllEmployee();
    },
    err=>{
      this.toastr.error('error');
    })
  }
  getAllEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
      this.employeeData=res;

    })
  }
  deleteEmployee(row : any){
    this.api.deleteEmployee(row.eid)
    .subscribe(res=>{
      this.toastr.info(row.name+" Deleted from Database");
      this.getAllEmployee()
      this.refreshList()
    })
  }



  adminEmployee(row:any){
    this.employeeModelObj.eid=row.eid;
    this.employeeModelObj.name=row.name;
    this.employeeModelObj.email=row.email;
    this.employeeModelObj.admin='1';
    
    this.employeeModelObj.password=row.password;
    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.eid)
    .subscribe(res=>{
      this.toastr.info("Successfully transferred "+this.employeeModelObj.name+" to Admin");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.refreshList();
      this.getAllEmployee();
    })
  }

  hrEmployee(row:any){
    this.employeeModelObj.eid=row.eid;
    this.employeeModelObj.name=row.name;
    this.employeeModelObj.email=row.email;
    this.employeeModelObj.admin='0';
    this.employeeModelObj.password=row.password;
    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.eid)
    .subscribe(res=>{
      this.toastr.info("Successfully transferred "+this.employeeModelObj.name+" to HR");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.refreshList();
      this.getAllEmployee();
    })
  }





  onEdit(row : any){
    this.showAdd=false;
    this.showUpdate=true;
    this.employeeModelObj.eid=row.eid;
    this.formValue.controls['eid'].setValue(row.eid);
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['admin'].setValue(row.admin);
    this.formValue.controls['password'].setValue(row.password);
    
  }
  updateEmployeeDetails(){
    this.employeeModelObj.eid=this.formValue.value.eid;
    this.employeeModelObj.name=this.formValue.value.name;
    this.employeeModelObj.email=this.formValue.value.email;
    this.employeeModelObj.admin=this.formValue.value.admin;
    this.employeeModelObj.password=this.formValue.value.password;
    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.eid)
    .subscribe(res=>{
      this.toastr.info(this.employeeModelObj.name+" Details Updated Successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.refreshList();
      this.getAllEmployee();
    })
  }

  logout(){
    this.toastr.success("Logout success!")
    
  }
  
    
  }

