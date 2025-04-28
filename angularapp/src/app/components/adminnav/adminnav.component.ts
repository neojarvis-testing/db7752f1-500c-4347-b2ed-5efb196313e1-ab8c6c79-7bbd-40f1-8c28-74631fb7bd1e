import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent implements OnInit {
  logout() {
    localStorage.clear();
    window.location.href = '/login';
  }

  constructor() { }

  ngOnInit(): void {
  }

}
