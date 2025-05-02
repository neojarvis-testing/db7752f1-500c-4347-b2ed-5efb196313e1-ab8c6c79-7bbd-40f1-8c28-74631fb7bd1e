import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from 'src/app/models/room.model';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-userviewroom',
  templateUrl: './userviewroom.component.html',
  styleUrls: ['./userviewroom.component.css']
})
export class UserviewroomComponent implements OnInit {
  

  rooms: Room[] = [];

  filteredRooms: Room[] = [];
  searchTerm: string = '';
  sortDirection: string = 'asc';

  constructor(private roomService : RoomService , private router: Router){}
  ngOnInit() {
    this.loadRooms();
  }


  loadRooms(){
    this.roomService.getAllRooms().subscribe(
      (res)=>{
        this.rooms = res;
        this.filteredRooms = [...this.rooms];
      }
    )
  }
  search() {
    const term = this.searchTerm.toLowerCase();
    this.filteredRooms = this.rooms.filter(room =>
      room.hotelName.toLowerCase().includes(term) ||
      room.roomType.toLowerCase().includes(term) ||
      room.location.toLowerCase().includes(term)
    );

  }

  sortByPrice() {
    this.filteredRooms.sort((a, b) => {
      return this.sortDirection === 'asc' ? a.pricePerNight - b.pricePerNight : b.pricePerNight - a.pricePerNight;
    });
  }

  bookRoom(roomId : number){
    this.router.navigate([`/user/add-booking/${roomId}`]);
  }

}



