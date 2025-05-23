import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingDto } from 'src/app/models/booking-dto.model';
import { Booking } from 'src/app/models/booking.model';
import { AuthService } from 'src/app/services/auth.service';
import { RoomService } from 'src/app/services/room.service';
declare var bootstrap: any;
@Component({
  selector: 'app-userviewmybooking',
  templateUrl: './userviewmybooking.component.html',
  styleUrls: ['./userviewmybooking.component.css']
})
export class UserviewmybookingComponent implements OnInit {
  rooms: BookingDto[] = []; 
  userId : string;
  bookingId: string;
  isDeleteModalVisible: boolean = false;
  constructor(private router: Router , private service : RoomService, private authService : AuthService) { }

  ngOnInit(): void {
    this.loadBookings();
    
  }

  loadBookings() {
    this.userId = this.authService.getUserId().toString();
    this.service.getBookingsByUserId(this.userId).subscribe(
      (res)=>{
        this.rooms= res;
      }
    )
  }

  confirmDelete(id: number) {
    this.bookingId = id.toString();
    this.isDeleteModalVisible = true;
  }
  
  deleteConfirmed() {
    this.service.deleteBooking(this.bookingId).subscribe(() => {
      this.loadBookings(); 
      this.isDeleteModalVisible = false;
    });
  }
  
  cancelDelete() {
    this.isDeleteModalVisible = false;
  }
}


