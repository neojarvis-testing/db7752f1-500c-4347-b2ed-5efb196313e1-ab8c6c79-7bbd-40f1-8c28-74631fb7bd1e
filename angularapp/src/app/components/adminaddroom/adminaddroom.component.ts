import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { Room } from 'src/app/models/room.model';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-adminaddroom',
  templateUrl: './adminaddroom.component.html',
  styleUrls: ['./adminaddroom.component.css']
})
export class AdminaddroomComponent {

  room: Room = {
    hotelName: '',
    roomType: '',
    noOfRooms: null,
    pricePerNight: null,
    location: '',
    bedType: '',
    isAvailable: false,
    description: '',
    facilities: '',
    imageUrl: ''
  };
  errorMessage: string= '';
  showSuccessModal = false;

  constructor(private roomService: RoomService, private router : Router) { }

  addRoom(form: any) {
    if (form.valid) {
      this.roomService.addRoom(this.room).subscribe(
        (res: any) => {
          console.log('Room added successfully', res);
          this.showSuccessModal = true;
          form.resetForm();
        },
        (error: any) => {
          console.log('Room addition failed', error);
          this.errorMessage = error.error?.message || 'An unexpected error occurred. Please try again.';
        }
      );
    }
  }
  
  closeModal() {
    this.showSuccessModal = false;
  }
}