import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from 'src/app/models/room.model';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-adminviewroom',
  templateUrl: './adminviewroom.component.html',
  styleUrls: ['./adminviewroom.component.css']
})
export class AdminviewroomComponent implements OnInit {
  rooms: Room[] = [];

  constructor(private roomService: RoomService, private router : Router) {}

  ngOnInit() {
   this.loadAllRooms();
  }

  loadAllRooms(){
    this.roomService.getAllRooms().subscribe(rooms => {
      this.rooms= rooms ; 
      console.log(this.rooms);
  });
  }

  editRoom(roomId: number) {
    console.log(roomId);
    
    this.router.navigate([`/admin/edit-room/${roomId}`]);
    // alert(`Editing room: ${room.hotelName}`);
  }

  deleteRoom(index: number) {
    if (confirm('Are you sure you want to delete this room?')) {
      this.rooms.splice(index, 1); 
    }
  }
  
}