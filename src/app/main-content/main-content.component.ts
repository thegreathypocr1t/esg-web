import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { Router } from "@angular/router";
import { DataService } from "../data.service";
import { PlatformLocation } from "@angular/common";
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {
  title = 'app';
  data: any;
  startCount = 1;
  end: any;
  public clicked = false;
  // addNewListUrl: string = "https://murmuring-coast-21531.herokuapp.com/students_ID";
  addNewListUrl: string = "http://localhost:3000/students_ID";

  constructor(private spinner: NgxSpinnerService, location: PlatformLocation, private srvc: DataService, private http:HttpClient, private router: Router) {
    location.onPopState(() => {
      console.log("pressed back in add!!!!!");
      //this.router.navigateByUrl(‘/multicomponent’);
      //history.forward();
      });
  }

  ngOnInit() {
  }

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = (XLSX.utils.sheet_to_json(ws, {header: 1}));
      // console.log(this.data);
      // console.log(this.data[3]); 
      // let trial = this.data[3];
      // console.log(trial[8]);
      this.end = this.data.length;
      console.log(this.end);
    };
    reader.readAsBinaryString(target.files[0]);
    setTimeout(() => {this.clicked = true;}, 500);
  }

  buttonOnClick() {
    this.spinner.show();
    // this.srvc.deleteStudent().subscribe(data => {
    //   console.log("Delete success", data);
    // });

    // this.example(1, this.data.length);
  }

  example(i, limit) {
    let arr = this.data[i];
    //Currently used for the ATTENDANCE-CHECKER APP
    this.http.post(this.addNewListUrl, {
      name: arr[0],
      gender: arr[2],
      course: arr[5],
      year: arr[1],
      student_ID: arr[3],
      student_NFC: arr[4]
    }).subscribe(
        (data: any) => console.log("succes at " + i),
        error => console.log(error + "at" + arr[0]),
        () => ++i < limit ? this.example(i, limit) : null
    );
  }

  logoutClicked() {
    this.router.navigate(["login"]);
  }
}
