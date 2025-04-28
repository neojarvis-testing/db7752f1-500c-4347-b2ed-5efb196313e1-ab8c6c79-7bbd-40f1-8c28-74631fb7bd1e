import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls: ['./usernav.component.css']
})
export class UsernavComponent implements OnInit {
  logout() {
    localStorage.clear();
    window.location.href = '/login';
  }

  constructor() { }

  ngOnInit(): void {
  }

}
