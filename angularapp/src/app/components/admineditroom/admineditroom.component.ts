import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from 'src/app/models/room.model';
import { RoomService } from 'src/app/services/room.service';


@Component({
  selector: 'app-admineditroom',
  templateUrl: './admineditroom.component.html',
  styleUrls: ['./admineditroom.component.css']
})
export class AdmineditroomComponent implements OnInit {

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
  roomId : string ;
  showSuccessModal: boolean = false;

  constructor(private roomService: RoomService, private router : Router, private route : ActivatedRoute) { }
  ngOnInit(): void {
    this.roomId= this.route.snapshot.paramMap.get('id');
    if (this.roomId) {
      this.roomService.getRoomById(this.roomId).subscribe(
        (res)=>{
          this.room = res;
        }
      );
    }
  }

  updateRoom(form: any) {
    if (form.valid) {      
      this.roomService.updateRoom(this.room.roomId, this.room).subscribe(
        (res: any) => {
          console.log('Room updated successfully', res);
          this.showSuccessModal = true; 
        },
        (error: any) => {
          console.log('Room updation failed', error);
          if(error.status === 400 && error.error?.errorMessage)
          {
            this.errorMessage = error.error?.message || 'An unexpected error occurred. Please try again.';
          }
          this.errorMessage = error.error?.message || 'An unexpected error occurred. Please try again.';
        }
      );
    }
  }
  
  
  navigateToViewRooms() {
    console.log("hhh");
    
    this.router.navigate(['/admin/view-rooms'])
  }

}
