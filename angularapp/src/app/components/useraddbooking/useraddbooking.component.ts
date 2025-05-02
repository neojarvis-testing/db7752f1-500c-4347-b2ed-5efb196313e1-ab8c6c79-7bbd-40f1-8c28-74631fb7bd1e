import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from 'src/app/models/booking.model';
import { AuthService } from 'src/app/services/auth.service';
import { RoomService } from 'src/app/services/room.service';
declare var bootstrap: any;

@Component({
  selector: 'app-useraddbooking',
  templateUrl: './useraddbooking.component.html',
  styleUrls: ['./useraddbooking.component.css']
})
export class UseraddbookingComponent implements OnInit {

  roomId!: number;
  booking: Booking = {
    userId: 0,
    roomId: 0,
    checkInDate: '',
    checkOutDate: '',
    status: '',
    specialRequests: '',
    bookingPurpose: '',
    additionalComments: ''
  };
  submitted = false;
  isRoomAvailable = true;
  isBookingSuccessful = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private authService: AuthService,
    private roomService: RoomService  
  ) {}

  ngOnInit(): void {
    this.roomId = Number(this.route.snapshot.paramMap.get('id'));
    this.booking.roomId = this.roomId;
    this.booking.userId = this.authService.getUserId();
  }

  onSubmit(form: any): void {
    this.submitted = true;
    if (!form.invalid){
      this.roomService.addBooking(this.booking).subscribe((res) => {
        this.isBookingSuccessful = true;
        const modalElement = document.getElementById('bookingSuccessModal');
        if (modalElement) {
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
        }
        setTimeout(() => this.router.navigate(['/user/my-bookings']), 3000);
    });
    }

  
}

  onCancel(): void {
    this.router.navigate(['/user/view-rooms']);
  }
}
