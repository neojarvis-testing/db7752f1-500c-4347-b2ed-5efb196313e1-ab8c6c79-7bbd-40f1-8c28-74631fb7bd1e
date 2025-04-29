import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Room } from 'src/app/models/room.model';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 
  rooms: Room[] = [];

  constructor(private roomService: RoomService) {}

  ngOnInit() {
    console.log("View room");
    
    this.roomService.getAllRooms().subscribe(rooms => {
        this.rooms= rooms ; 
        console.log(this.rooms);
    });
  }

  editRoom(room: Room) {
    alert(`Editing room: ${room.hotelName}`);
  }

  deleteRoom(index: number) {
    if (confirm('Are you sure you want to delete this room?')) {
      this.rooms.splice(index, 1); 
    }
  }
 

}
