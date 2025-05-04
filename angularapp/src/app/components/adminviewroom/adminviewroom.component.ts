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
  filteredRoomList: Room[] = [];
  searchTerm: string = '';
  roomToDelete: Room | null = null;
  showDeleteModal = false;

  isLoadingRooms = false;
  isDeleting = false;
  errorMessage: string | null = null;

  constructor(private roomService: RoomService, private router: Router) {}

  ngOnInit() {
    this.loadAllRooms();
  }

  loadAllRooms() {
    this.isLoadingRooms = true;
    this.roomService.getAllRooms().subscribe(
      rooms => {
        this.rooms = rooms;
        this.filteredRoomList = [...rooms];
        this.isLoadingRooms = false;
      },
      error => {
        console.error('Error loading rooms:', error);
        this.isLoadingRooms = false;
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
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.roomToDelete = null;
    this.isDeleting = false;
    this.errorMessage = null;
  }

  confirmDelete() {
    if (this.roomToDelete) {
      this.isDeleting = true;
      this.roomService.deleteRoom(this.roomToDelete.roomId).subscribe(
        () => {
          // Success: Remove room from the list
          this.rooms = this.rooms.filter(room => room.roomId !== this.roomToDelete?.roomId);
          this.filteredRoomList = this.filteredRoomList.filter(room => room.roomId !== this.roomToDelete?.roomId);
          this.closeDeleteModal();
        },
        (error) => {
          this.isDeleting = false;
          if (error?.status === 400 && error?.error?.message) {
            this.errorMessage = error.error.message;  
          } else {
            this.errorMessage = 'An unexpected error occurred while deleting the room.';
          }
        }
      );
    }
  }
  
  
}
