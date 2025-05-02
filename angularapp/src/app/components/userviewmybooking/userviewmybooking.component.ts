import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userviewmybooking',
  templateUrl: './userviewmybooking.component.html',
  styleUrls: ['./userviewmybooking.component.css']
})
export class UserviewmybookingComponent implements OnInit {
  rooms: any[] = []; // Array to hold room data

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Sample data initialization on component load
    this.rooms = [
      {
        id: 1,
        image: 'hero_2.jpg',
        price: 21000,
        location: '123 Main St',
        description: 'King Spacious room with ocean view, WiFi, Air Conditioning, Flat-screen TV, Mini Bar, Jacuzzi',
        isAvailable: true // Indicates room availability
      },
      {
        id: 2,
        image: 'room2.jpg',
        price: 18000,
        location: '456 Elm Ave',
        description: 'Cozy room with city view, WiFi, Air Conditioning',
        isAvailable: true // Initially available
      }
    ];
  }

  // Redirect to booking request form
  bookRoom(roomId: number): void {
    this.router.navigate(['/bookroom', roomId]); // Navigate to booking form
  }
}


