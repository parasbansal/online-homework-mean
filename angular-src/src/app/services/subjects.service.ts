import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';

@Injectable()
export class SubjectsService {

  constructor(
    private http: Http,
    private authService: AuthService
  ) { }

  getSubjectsByClass(classNumber) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/subjects/class/' + classNumber, { headers: headers })
      .map(res => res.json());
  }

  newSubject(data) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/subjects/add', data, { headers: headers })
      .map(res => res.json());
  }

  editSubject(data) {
    console.log(data);
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/subjects/edit', data, { headers: headers })
      .map(res => res.json());
  }

  deleteSubject(id) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.delete('http://localhost:3000/subjects/delete/' + id, { headers: headers })
      .map(res => res.json());
  }

}
