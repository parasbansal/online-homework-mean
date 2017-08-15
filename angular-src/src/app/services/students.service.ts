import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';

@Injectable()
export class StudentsService {

  constructor(
    private http: Http,
    private authService: AuthService
  ) { }

  getStudents() {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/students', { headers: headers })
      .map(res => res.json());
  }


}
