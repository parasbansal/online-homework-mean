import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students: Object[];
  totalStudents: Number;
  search: any;

  constructor(
    private studentsService: StudentsService
  ) { }

  ngOnInit() {
    this.studentsService.getStudents().subscribe(data => {
      this.students = data.students;
      this.totalStudents = this.students.length;
    }, err => {
      console.log(err);
      return false;
    });
  }

  searchSubmit() {
    console.log(this.search);
  }

}
