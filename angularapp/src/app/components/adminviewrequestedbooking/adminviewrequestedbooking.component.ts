import { Component, OnInit } from '@angular/core';
import { BookingDto } from 'src/app/models/booking-dto.model';
import { Booking } from 'src/app/models/booking.model';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-adminviewrequestedbooking',
  templateUrl: './adminviewrequestedbooking.component.html',
  styleUrls: ['./adminviewrequestedbooking.component.css']
})
export class AdminviewrequestedbookingComponent implements OnInit {
  bookings: BookingDto[] = [];
  filteredBookings: BookingDto[] = [];
  searchTerm: string = '';

  constructor(private bookingService: RoomService ) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.bookingService.getAllBookings().subscribe(
      (data) => {
        this.bookings = data;
        this.filteredBookings = [...this.bookings]; 
      },
      (error) => {
        console.error('Error fetching bookings', error);
      }
    );
  }

  onSearchChange(): void {
    const term = this.searchTerm.trim().toLowerCase();
    if (term.length >= 3) {
      this.filteredBookings = this.bookings.filter(booking =>
        booking.hotelName.toLowerCase().includes(term)
      );
    } else {
      this.filteredBookings = [...this.bookings]; 
    }
  }

  confirmBooking(booking: BookingDto): void {
    const updatedBooking: Booking = {
      ...booking,
      status: 'Confirmed'
    };
  
    this.bookingService.updateBooking(booking.bookingId.toString(), updatedBooking).subscribe({
      next: (response) => {
        booking.status = 'Confirmed'; 
      },
      error: (err) => {
        console.error('Error confirming booking:', err);
      }
    });
  }
  
  rejectBooking(booking: BookingDto): void {
    const updatedBooking: Booking = {
      ...booking,
      status: 'Rejected'
    };
  
    this.bookingService.updateBooking(booking.bookingId.toString(), updatedBooking).subscribe({
      next: (response) => {
        booking.status = 'Rejected'; 
      },
      error: (err) => {
        console.error('Error rejecting booking:', err);
      }
    });
  }
  
}