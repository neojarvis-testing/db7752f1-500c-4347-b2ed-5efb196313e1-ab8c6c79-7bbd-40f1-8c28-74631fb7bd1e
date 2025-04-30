import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent implements OnInit {
 
  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    //
  }

  logout() {
    console.log('Logging out...');
    this.authService.logout();
  }


}
