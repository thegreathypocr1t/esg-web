import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { Observable } from "rxjs"; 
import { Router } from "@angular/router";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  body = {
    username: '',
    password: ''
  };
  // response: Observable<any>;
  response: any;

  constructor(private spinner: NgxSpinnerService, private data: DataService, private router: Router) { }

  ngOnInit() {
  }

  loginClicked() {

    if(this.username === '' || this.password === '') {
      alert("Please fill out the required fields.");
    }
    else {
      this.body.username = this.username;
      this.body.password = this.password;
      console.log(this.body);

      this.spinner.show();

      this.data.login(this.body).subscribe(data => {
        console.log(data);

        if(data.result === 1) {
          console.log("AUTHORIZED");
          this.router.navigate(["main"]);
        }
        else {
          this.spinner.hide();

          console.log("NOT AUTHORIZED");
          alert("Login failed. Please check your username and password again.");
        }
      });
    }
  }
}
