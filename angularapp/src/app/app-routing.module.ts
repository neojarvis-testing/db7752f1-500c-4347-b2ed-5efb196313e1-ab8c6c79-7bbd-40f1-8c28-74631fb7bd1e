import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
// import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { AuthGuard } from './components/authguard/auth.guard';
import { AdminaddroomComponent } from './components/adminaddroom/adminaddroom.component';
import { AdmineditroomComponent } from './components/admineditroom/admineditroom.component';
import { AdminviewroomComponent } from './components/adminviewroom/adminviewroom.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { AdminviewrequestedbookingComponent } from './components/adminviewrequestedbooking/adminviewrequestedbooking.component';
// import { UsernavComponent } from './components/usernav/usernav.component';
import { UseraddbookingComponent } from './components/useraddbooking/useraddbooking.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UserviewroomComponent } from './components/userviewroom/userviewroom.component';
import { UserviewmybookingComponent } from './components/userviewmybooking/userviewmybooking.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { ErrorComponent } from './components/error/error.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'admin/dashboard', component: DashboardComponent , canActivate:[AuthGuard]},
  { path: 'admin/add-room', component: AdminaddroomComponent, canActivate: [AuthGuard] },
  { path: 'admin/edit-room/:id', component: AdmineditroomComponent, canActivate: [AuthGuard] },
  { path: 'admin/view-rooms', component: AdminviewroomComponent, canActivate: [AuthGuard] },
  { path: 'admin/view-feedback', component: AdminviewfeedbackComponent, canActivate: [AuthGuard] },
  { path: 'admin/view-bookings', component: AdminviewrequestedbookingComponent, canActivate: [AuthGuard] },
  { path: 'user/home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'user/add-booking', component: UseraddbookingComponent, canActivate: [AuthGuard] },
  { path: 'user/add-feedback', component: UseraddfeedbackComponent, canActivate: [AuthGuard] },
  { path: 'user/view-rooms', component: UserviewroomComponent, canActivate: [AuthGuard] },
  { path: 'user/my-bookings', component: UserviewmybookingComponent, canActivate: [AuthGuard] },
  { path: 'user/view-feedback', component: UserviewfeedbackComponent, canActivate: [AuthGuard] },
  { path: '**', component: ErrorComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
