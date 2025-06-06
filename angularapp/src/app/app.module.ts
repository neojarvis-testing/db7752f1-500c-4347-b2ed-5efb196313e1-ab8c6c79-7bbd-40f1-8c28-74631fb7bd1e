import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminaddroomComponent } from './components/adminaddroom/adminaddroom.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { AdmineditroomComponent } from './components/admineditroom/admineditroom.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { AdminviewrequestedbookingComponent } from './components/adminviewrequestedbooking/adminviewrequestedbooking.component';
import { AdminviewroomComponent } from './components/adminviewroom/adminviewroom.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UseraddbookingComponent } from './components/useraddbooking/useraddbooking.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UserviewroomComponent } from './components/userviewroom/userviewroom.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { UserviewmybookingComponent } from './components/userviewmybooking/userviewmybooking.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsernavComponent } from './components/usernav/usernav.component';
import { GuestLayoutComponent } from './components/guest-layout/guest-layout.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './components/user-layout/user-layout.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AdminaddroomComponent,
    AdminnavComponent,
    AdmineditroomComponent,
    AdminviewfeedbackComponent,
    AdminviewrequestedbookingComponent,
    AdminviewroomComponent,
    ErrorComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    RegistrationComponent,
    UseraddbookingComponent,
    UseraddfeedbackComponent,
    UserviewroomComponent,
    UserviewfeedbackComponent,
    UserviewmybookingComponent,
    DashboardComponent,
    UsernavComponent,
    GuestLayoutComponent,
    AdminLayoutComponent,
    UserLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,  // For making HTTP requests
    FormsModule        // For template-driven forms
  ],
  providers: [
    // This tells Angular to use the AuthInterceptor for all HTTP requests
    // It checks if the user is logged in and adds the token to the request header.
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true // This makes sure the interceptor works alongside others, not replacing them.
    }
  ],
  bootstrap: [AppComponent]  // This is the root component that will be bootstrapped when the app starts.
})
export class AppModule { }
