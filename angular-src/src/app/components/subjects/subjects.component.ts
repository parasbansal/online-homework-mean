import { Component, OnInit } from '@angular/core';
import { SubjectsService } from '../../services/subjects.service';

declare var $: any;

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  classes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  selectedClass: Number;

  subjects: Object[];

  name: String;

  editSubject = Object;

  deleteSubject = String;

  constructor(
    private subjectsService: SubjectsService
  ) { }

  ngOnInit() {
    this.selectedClass = 1;
    this.getSubjects();
    $('.modal').modal();
  }

  getSubjects() {
    this.subjectsService.getSubjectsByClass(this.selectedClass).subscribe(data => {
      if (data.status) {
        this.subjects = data.subjects
      } else {
        this.subjects = null;
      }
    });
  }

  selectAClass(classNumber) {
    this.selectedClass = classNumber;
    this.getSubjects();
  }

  newSubject() {
    const newSubject = {
      subject: this.name,
      class: this.selectedClass
    }

    this.subjectsService.newSubject(newSubject).subscribe(data => {
      this.getSubjects();
    });
  }

  editBtnClicked(subject) {
    this.editSubject = subject;
  }

  editSubjectSubmit() {
    this.subjectsService.editSubject(this.editSubject).subscribe(data => {
      this.getSubjects();
    });
  }

  deleteBtnClicked(subject_id) {
    this.deleteSubject = subject_id;
    console.log(this.deleteSubject);
  }

  deleteSubjectSubmit() {
    this.subjectsService.deleteSubject(this.deleteSubject).subscribe(data => {
      console.log(data);
      this.getSubjects();
    });
  }

}
