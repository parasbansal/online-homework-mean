import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';

@Injectable()
export class HomeworksService {

  constructor(
    private http: Http,
    private authService: AuthService
  ) { }

  getHomeworksBySubjects(subject_id) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/homeworks/subject/' + subject_id, { headers: headers })
      .map(res => res.json());
  }

  newHomework(data) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/homeworks/add', data, { headers: headers })
      .map(res => res.json());
  }

  editHomework(data) {
    console.log(data);
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/homeworks/edit', data, { headers: headers })
      .map(res => res.json());
  }

  deleteHomework(id) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.delete('http://localhost:3000/homeworks/delete/' + id, { headers: headers })
      .map(res => res.json());
  }
}
