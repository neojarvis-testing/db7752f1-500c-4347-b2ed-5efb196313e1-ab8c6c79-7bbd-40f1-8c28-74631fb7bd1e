import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthGuard } from './components/authguard/auth.guard';
import { AdminaddroomComponent } from './components/adminaddroom/adminaddroom.component';
import { AdmineditroomComponent } from './components/admineditroom/admineditroom.component';
import { AdminviewroomComponent } from './components/adminviewroom/adminviewroom.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { AdminviewrequestedbookingComponent } from './components/adminviewrequestedbooking/adminviewrequestedbooking.component';
import { UseraddbookingComponent } from './components/useraddbooking/useraddbooking.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UserviewroomComponent } from './components/userviewroom/userviewroom.component';
import { UserviewmybookingComponent } from './components/userviewmybooking/userviewmybooking.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { ErrorComponent } from './components/error/error.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GuestLayoutComponent } from './components/guest-layout/guest-layout.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './components/user-layout/user-layout.component';

const routes: Routes = [

  {
    path: '',
    component: GuestLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegistrationComponent },
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [ 
      { path: 'dashboard', component: DashboardComponent },
      { path: 'add-room', component: AdminaddroomComponent },
      { path: 'edit-room/:id', component: AdmineditroomComponent },
      { path: 'view-rooms', component: AdminviewroomComponent },
      { path: 'view-feedback', component: AdminviewfeedbackComponent },
      { path: 'view-bookings', component: AdminviewrequestedbookingComponent },
    ],
  },
  {
    path: 'user',
    component: UserLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'add-booking', component: UseraddbookingComponent },
      { path: 'add-feedback', component: UseraddfeedbackComponent },
      { path: 'view-rooms', component: UserviewroomComponent },
      { path: 'my-bookings', component: UserviewmybookingComponent },
      { path: 'view-feedback', component: UserviewfeedbackComponent },
    ],
  },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
