import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators' 

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postEmployee(data : any): Observable<any>{
    return this.http.post('http://localhost:8080/api/data/user',data)
    .pipe(map((res:any)=>{
      return res;
    }) )
  }

  postCurrent(data : any,eid:number): Observable<any>{
    return this.http.put("http://localhost:8080/api/data/current/"+eid,data)
    .pipe(map((res:any)=>{
      return res;
    }) )
  }

  getCurrent(): Observable<any>{
    return this.http.get("http://localhost:8080/api/data/current")
    .pipe(map((res:any)=>{
      return res;
    }) )
  }


  getEmployee(){
    return this.http.get<any>("http://localhost:3000/posts")
    .pipe(map((res:any)=>{
      return res;
    }) )
  }
  updateEmployee(data : any,eid: number){
    return this.http.put<any>("http://localhost:8080/api/data/user/"+eid,data)
    .pipe(map((res:any)=>{
      return res;
    }) )
  }



  deleteEmployee(eid : number){
    return this.http.delete<any>("http://localhost:8080/api/data/user/"+eid)
    .pipe(map((res:any)=>{
      return res;
    }) )
  }
}
