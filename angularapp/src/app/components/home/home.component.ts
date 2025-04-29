import { Component, OnInit } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import WOW from 'wowjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    new WOW.WOW().init();
  }
}