import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Room } from 'src/app/models/room.model';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

 
  recentBookings = [
    { bookingId: 101, roomName: 'Deluxe Suite', status: 'Pending' },
    { bookingId: 102, roomName: 'Single Room', status: 'Confirmed' },
    { bookingId: 103, roomName: 'Executive Room', status: 'Cancelled' },
    { bookingId: 104, roomName: 'Luxury Villa', status: 'Confirmed' },
    { bookingId: 105, roomName: 'Family Suite', status: 'Pending' }
  ];

  recentFeedbacks = [
    { username: 'Alice', text: 'Great stay!' },
    { username: 'Bob', text: 'Service was excellent.' },
    { username: 'Charlie', text: 'Room could be cleaner.' },
    { username: 'Diana', text: 'Loved the breakfast!' },
    { username: 'Ethan', text: 'Will book again.' }
  ];

  totalConfirmed = 0;
  totalPending = 0;
  totalRejected = 0;
  totalBookings = 0;

  ngOnInit(): void {
    this.totalBookings = this.recentBookings.length;
    this.totalConfirmed = this.recentBookings.filter(b => b.status === 'Confirmed').length;
    this.totalPending = this.recentBookings.filter(b => b.status === 'Pending').length;
    this.totalRejected = this.recentBookings.filter(b => b.status === 'Cancelled').length;
  }

}

