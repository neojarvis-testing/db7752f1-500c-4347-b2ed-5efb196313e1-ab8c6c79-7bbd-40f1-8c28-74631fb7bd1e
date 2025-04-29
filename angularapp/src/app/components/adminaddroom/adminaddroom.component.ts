import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
    noOfRooms: 0,
    pricePerNight: 0,
    location: '',
    bedType: '',
    isAvailable: false,
    description: '',
    facilities: '',
    imageUrl: ''
  };

  constructor(private roomService: RoomService, private router : Router) { }


  addRoom(form: any) {
    if (form.valid) {
      // this.roomAdded.emit(this.room);
      this.roomService.addRoom(this.room).subscribe(
        (res : any)=>{

          this.router.navigate(['admin/view-rooms'])
        },(error : any)=>{

        }
      )
    }
  }
}

