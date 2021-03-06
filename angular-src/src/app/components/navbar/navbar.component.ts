import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: Object;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.authService.loggedIn()) {
      this.authService.getProfile().subscribe(profile => {
        this.user = profile.user;
      }, err => {
        console.log(err);
        return false;
      });
    } else {
      this.user = "user";
    }
  }

  logoutClicked() {
    this.authService.logout();
    this.router.navigate(['']);
  }

}
