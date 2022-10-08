import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dash board.model';
import { SharedService } from '../shared/shared.service';
import { Tutorial, Current } from '../models/tutorial.model';
import { TutorialService } from '../shared/tutorial.service';
import { CurrentUser } from '../manage-user/employee-dash board.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent implements OnInit {
  message: any | undefined;
  formValue!: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  current: string | undefined;
  showAdmin: boolean = true;
  currentobj: CurrentUser = new CurrentUser();

  tutorials?: Tutorial[];
  tutorialsCurrent?: Current[];
  currentTutorial: Tutorial = {};
  currentIndex = -1;
  title = '';
  showUser!: boolean;

  constructor(
    private tutorialService: TutorialService,
    private shared: SharedService,
    private formbuilder: FormBuilder,
    private api: ApiService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.retrieveTutorials();
    this.retrieveTutorialsCurrent();

    this.formValue = this.formbuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: [''],
    });
    this.getAllEmployee();
  }

  retrieveTutorials(): void {
    console.log(this.tutorialsCurrent);
    this.tutorialService.getAll().subscribe({
      next: (data) => {
        this.tutorials = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  refreshList(): void {
    this.retrieveTutorials();
    this.retrieveTutorialsCurrent();
  }

  clickAddEmployee() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  retrieveTutorialsCurrent(): void {
    console.log(this.tutorialsCurrent);
    this.tutorialService.getAllCurrent().subscribe({
      next: (data) => {
        this.tutorialsCurrent = data;
        console.log(data);
        this.showAdmin = this.tutorialsCurrent[0].cadmin;
      },
      error: (e) => console.error(e),
    });
    console.log(this.tutorialsCurrent);
  }

  postEmployeeDetails() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.postEmployee(this.employeeModelObj).subscribe(
      (res) => {
        console.log(res);
        this.toastr.success('Employee Added Successfully');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      },
      (err) => {
        this.toastr.error('Something Went Wrong');
      }
    );
  }
  getAllEmployee() {
    this.api.getEmployee().subscribe((res) => {
      this.employeeData = res;
    });
  }
  deleteEmployee(row: any) {
    this.api.deleteEmployee(row.id).subscribe((res) => {
      this.toastr.info('Employee Deleted');
      this.getAllEmployee();
    });
  }
  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
  }
  updateEmployeeDetails() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;
    this.api
      .updateEmployee(this.employeeModelObj, this.employeeModelObj.id)
      .subscribe((res) => {
        this.toastr.info('Updated Successfully');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      });
  }

  logout() {
    this.toastr.success('Logout success!');
  }
}
