import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { SubjectsService } from '../../services/subjects.service';
import { HomeworksService } from '../../services/homeworks.service';

declare var $: any;

@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.css']
})
export class HomeworkComponent implements OnInit {

  myId: String;

  classes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  selectedClass: Number;

  subjects: Object[];
  selectedSubject: Object;

  homeworks: Object[];

  title: String;
  body: String;


  editHomework: Object;
  deleteHomework: String;


  constructor(
    private authService: AuthService,
    private subjectsService: SubjectsService,
    private homeworksService: HomeworksService
  ) { }

  ngOnInit() {
    this.myId = this.authService.myId();
    this.selectedClass = 1;
    this.getSubjects();
    $('.modal').modal();
  }

  getSubjects() {
    this.subjectsService.getSubjectsByClass(this.selectedClass).subscribe(data => {
      if (data.status) {
        this.subjects = data.subjects
        this.selectedSubject = data.subjects[0];
        this.getHomeworks();
      } else {
        this.subjects = null;
      }
    });
  }

  selectAClass(classNumber) {
    this.selectedClass = classNumber;
    this.getSubjects();
  }

  selectASubject(subject) {
    this.selectedSubject = subject;
    this.getHomeworks();
  }

  getHomeworks() {
    this.homeworksService.getHomeworksBySubjects(this.selectedSubject['_id']).subscribe(data => {
      if (data.status) {
        this.homeworks = data.homeworks
      } else {
        this.homeworks = null;
      }
    });
  }

  newHomeworkSubmit() {
    const newHomework = {
      title: this.title,
      body: this.body,
      subject: this.selectedSubject['_id']
    }

    this.homeworksService.newHomework(newHomework).subscribe(data => {
      this.getHomeworks();
    });

  }

  editBtnClicked(homework) {
    this.editHomework = homework;
  }

  editHomeworkSubmit() {
    this.homeworksService.editHomework(this.editHomework).subscribe(data => {
      this.getHomeworks();
      console.log(data);
    });
  }

  deleteBtnClicked(homework_id) {
    this.deleteHomework = homework_id;
  }

  deleteHomeworkSubmit() {
    this.homeworksService.deleteHomework(this.deleteHomework).subscribe(data => {
      this.getHomeworks();
    });
  }

}
