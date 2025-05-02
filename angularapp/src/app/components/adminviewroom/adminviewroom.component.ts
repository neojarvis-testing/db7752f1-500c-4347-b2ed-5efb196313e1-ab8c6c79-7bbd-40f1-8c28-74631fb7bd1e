import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from 'src/app/models/room.model';
import { RoomService } from 'src/app/services/room.service';
declare var bootstrap: any;

@Component({
  selector: 'app-adminviewroom',
  templateUrl: './adminviewroom.component.html',
  styleUrls: ['./adminviewroom.component.css']
})
export class AdminviewroomComponent implements OnInit {
  rooms: Room[] = []; 
  filteredRoomList: Room[] = [];
  searchTerm: string = '';
  roomToDelete: Room | null = null; 

  constructor(private roomService: RoomService, private router: Router) {}

  ngOnInit() {
    this.loadAllRooms();
  }

  loadAllRooms() {
    this.roomService.getAllRooms().subscribe(
      rooms => {
        this.rooms = rooms;
        this.filteredRoomList = [...rooms];
      },
      error => {
        console.error('Error loading rooms:', error);
      }
    );
  }

  onSearchChange() {
    if (!this.searchTerm) {
      this.filteredRoomList = [...this.rooms];
      return;
    }
    const term = this.searchTerm.trim().toLowerCase();
    if (term.length >= 3) {
      this.filteredRoomList = this.rooms.filter(room =>
        room.hotelName.toLowerCase().includes(term)
      );
    } else {
      this.filteredRoomList = [...this.rooms];
    }
  }

  editRoom(roomId: number) {
    this.router.navigate([`/admin/edit-room/${roomId}`]);
  }

  deleteRoom(room: Room) {
    this.roomToDelete = room;
    const modalElement = document.getElementById('deleteConfirmModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  confirmDelete() {
    if (this.roomToDelete) {
      this.roomService.deleteRoom(this.roomToDelete.roomId).subscribe(
        () => {
          this.rooms = this.rooms.filter(room => room.roomId !== this.roomToDelete?.roomId);
          this.filteredRoomList = this.filteredRoomList.filter(room => room.roomId !== this.roomToDelete?.roomId);
  
          const modalElement = document.getElementById('deleteConfirmModal');
          if (modalElement) {
            const modalInstance = bootstrap.Modal.getInstance(modalElement); // ✅ Get existing modal instance
            if (modalInstance) {
              modalInstance.hide(); // ✅ Properly hide
            }
          }
  
          this.roomToDelete = null;
        },
        (error) => {
          console.error('Error deleting room:', error);
        }
      );
    }
  }
  
  
}
