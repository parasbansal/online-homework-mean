// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StudentsComponent } from './components/students/students.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { HomeworkComponent } from './components/homework/homework.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

// Services
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { StudentsService } from './services/students.service';
import { SubjectsService } from './services/subjects.service';
import { HomeworksService } from './services/homeworks.service';

// Gaurds
import { AuthGuard } from './guards/auth.gaurd';
import { GuestGuard } from './guards/guest.gaurd';
import { TeacherGuard } from './guards/teacher.gaurd';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [GuestGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },

  { path: 'dashboard', component: DashboardComponent, canActivate: [TeacherGuard] },
  { path: 'students', component: StudentsComponent, canActivate: [TeacherGuard] },
  { path: 'subjects', component: SubjectsComponent, canActivate: [TeacherGuard] },

  { path: 'homework', component: HomeworkComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },


  { path: 'not_found', component: NotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    StudentsComponent,
    SubjectsComponent,
    HomeworkComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule
  ],
  providers: [
    ValidateService,
    AuthService,
    StudentsService,
    SubjectsService,
    HomeworksService,
    AuthGuard,
    GuestGuard,
    TeacherGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
