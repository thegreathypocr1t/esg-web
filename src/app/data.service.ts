import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // loginUrl: string = "https://fast-wildwood-79987.herokuapp.com/users/login";
  loginUrl: string = "http://localhost:3000/users/login";
  // deleteAllStudentUrl: string = "https://fast-wildwood-79987.herokuapp.com/student_ID";
  deleteAllStudentUrl: string = "http://localhost:3000/student_ID";

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
      // 'Authorization': 'my-auth-token'
    })
  };

  login(body: any): Observable<any> {
    console.log("body at service.ts", body)
    return this.http.post<any>(this.loginUrl, body, this.httpOptions);
  }

  // deleteStudent (id: any): Observable<{}> {
  //   return this.http.delete("https://fast-wildwood-79987.herokuapp.com/users/" + id, this.httpOptions);
  // }

  deleteStudent (): Observable<{}> {
    return this.http.delete(this.deleteAllStudentUrl, this.httpOptions);
  }
}