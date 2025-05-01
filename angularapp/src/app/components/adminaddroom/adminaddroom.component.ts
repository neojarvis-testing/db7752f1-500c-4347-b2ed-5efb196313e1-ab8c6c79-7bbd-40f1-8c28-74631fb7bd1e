import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from 'src/app/models/room.model';
import { RoomService } from 'src/app/services/room.service';

declare var bootstrap: any;
@Component({
  selector: 'app-adminaddroom',
  templateUrl: './adminaddroom.component.html',
  styleUrls: ['./adminaddroom.component.css']
})
export class AdminaddroomComponent {

  room: Room = {
    hotelName: '',
    roomType: '',
    noOfRooms: 0,
    pricePerNight: 0,
    location: '',
    bedType: '',
    isAvailable: false,
    description: '',
    facilities: '',
    imageUrl: ''
  };
  errorMessage: string= '';

  constructor(private roomService: RoomService, private router : Router) { }

  addRoom(form: any) {
    if (form.valid) {      
      this.roomService.addRoom(this.room).subscribe(
        (res: any) => {
          console.log('Room added successfully', res);
          setTimeout(() => {
            const modalElement = document.getElementById('successModal');
            if (modalElement) {
              const modal = new bootstrap.Modal(modalElement);
              modal.show();
            }
          }, 0);
           form.resetForm();
        },
        (error: any) => {
          console.log('Room addition failed', error);
          this.errorMessage = error.error?.message || 'An unexpected error occurred. Please try again.';
        }
      );
    }
  }
  
}