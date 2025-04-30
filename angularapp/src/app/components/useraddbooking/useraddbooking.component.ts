// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-useraddbooking',
//   templateUrl: './useraddbooking.component.html',
//   styleUrls: ['./useraddbooking.component.css']
// })
// export class UseraddbookingComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }


import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-useraddbooking',
  templateUrl: './useraddbooking.component.html',
  styleUrls: ['./useraddbooking.component.css']
})
export class UseraddbookingComponent {
  checkIn!: Date;
  checkOut!: Date;
  specialRequests!: string;
  bookingPurpose!: string;
  additionalComments!: string;
  
  existingBookings = [
    { checkIn: new Date('2025-04-28'), checkOut: new Date('2025-05-02'), status: 'Approved' }
  ]; // Example existing approved bookings

  constructor(private router: Router) {}

  onSubmit() {
    if (!this.checkIn || !this.checkOut || !this.specialRequests || !this.bookingPurpose || !this.additionalComments) {
      alert("All fields are required.");
      return;
    }

    if (this.checkOut <= this.checkIn) {
      alert("Check-Out Date must be after Check-In Date.");
      return;
    }

    // Check if the selected dates overlap with an existing "Approved" booking
    const isBooked = this.existingBookings.some(booking =>
      booking.status === 'Approved' &&
      ((this.checkIn >= booking.checkIn && this.checkIn <= booking.checkOut) || 
      (this.checkOut >= booking.checkIn && this.checkOut <= booking.checkOut) ||
      (this.checkIn <= booking.checkIn && this.checkOut >= booking.checkOut))
    );

    if (isBooked) {
      alert("Booking already exists within the selected date range.");
      return;
    }

    // Simulate successful booking
    alert("Successfully Submitted!");

    // Redirect upon clicking "Ok"
    this.router.navigate(['/userviewmybooking']);
  }

  getBookingStatus(): string {
    return this.existingBookings.length > 0 ? "Booked" : "Book Now";
  }

  userviewmybooking() {
    this.router.navigate(['/userviewmybooking']);
  }
}
