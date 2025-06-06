import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from 'src/app/models/booking.model';
import { AuthService } from 'src/app/services/auth.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-useraddbooking',
  templateUrl: './useraddbooking.component.html',
  styleUrls: ['./useraddbooking.component.css']
})
export class UseraddbookingComponent implements OnInit {

  roomId: number;
  booking: Booking = {
    userId: 0,
    roomId: 0,
    checkInDate: '',
    checkOutDate: '',
    status: 'Pending',
    specialRequests: '',
    bookingPurpose: '',
    additionalComments: ''
  };


  submitted = false;
  isRoomAvailable = true;
  isBookingSuccessful = false;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private roomService: RoomService
  ) { }

  ngOnInit(): void {
    this.roomId = Number(this.route.snapshot.paramMap.get('id'));
    this.booking.roomId = this.roomId;
    this.booking.userId = this.authService.getUserId();
  }

  onSubmit(): void {


    if (new Date(this.booking.checkOutDate) <= new Date(this.booking.checkInDate)) {
      this.errorMessage = "Check-out date must be later than check-in date.";
      return;
    }
    this.submitted = true;
    if (this.booking.checkInDate && this.booking.checkOutDate && this.booking.bookingPurpose) {
      console.log("hello");
      
      this.roomService.addBooking(this.booking).subscribe((res) => {
        console.log("booking", this.booking);
        this.isBookingSuccessful = true;
      });
    }
  }

  ConfirmOkay() {
    this.router.navigate(['/user/my-bookings'])
  }

  onCancel(): void {
    this.router.navigate(['/user/view-rooms']);
  }
}
