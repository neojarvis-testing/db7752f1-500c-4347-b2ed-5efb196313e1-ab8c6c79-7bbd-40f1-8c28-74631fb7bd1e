import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/models/booking.model';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-adminviewrequestedbooking',
  templateUrl: './adminviewrequestedbooking.component.html',
  styleUrls: ['./adminviewrequestedbooking.component.css']
})
export class AdminviewrequestedbookingComponent implements OnInit {

  bookings: Booking[] = [];

  constructor(private bookingService: RoomService) {}

  ngOnInit() {
    this.fetchBookings();
  }

  fetchBookings() {
    this.bookingService.getAllBookings().subscribe(response => {
      this.bookings = response;
      console.log("Bookings Loaded:", this.bookings);
    });
  }

  confirmBooking(booking: Booking) {
    booking.status = 'Confirmed';
    console.log(`Booking ${booking.bookingId} confirmed.`);
  }

  rejectBooking(booking: Booking) {
    booking.status = 'Rejected';
    console.log(`Booking ${booking.bookingId} rejected.`);
  }

}
