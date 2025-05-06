import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from '../models/room.model';
import { Observable } from 'rxjs';
import { Booking } from '../models/booking.model';
import { BookingDto } from '../models/booking-dto.model';
import { environment } from 'src/environments/environment';
import { DashboardSummary } from '../models/dashboard-summary.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  apiUrl: string = environment.apiUrl;

  constructor(private client: HttpClient) {}

  getSummary(): Observable<DashboardSummary> {
    return this.client.get<DashboardSummary>(`${this.apiUrl}/api/room/dashboard-summary`);
  }

  getAllRooms(): Observable<Room[]> {
    return this.client.get<Room[]>(`${this.apiUrl}/api/room`);
  }

  getRoomById(roomId: string): Observable<Room> {
    return this.client.get<Room>(`${this.apiUrl}/api/room/${roomId}`);
  }

  addRoom(room: Room): Observable<Room> {
    return this.client.post<Room>(`${this.apiUrl}/api/room`, room);
  }

  updateRoom(roomId: number, room: Room): Observable<Room> {
    return this.client.put<Room>(`${this.apiUrl}/api/room/${roomId}`, room);
  }

  deleteRoom(roomId: number): Observable<void> {
    return this.client.delete<void>(`${this.apiUrl}/api/room/${roomId}`);
  }

  getAllBookings(): Observable<BookingDto[]> {
    return this.client.get<BookingDto[]>(`${this.apiUrl}/api/booking`);
  }

  getBookingsByUserId(userId: string): Observable<BookingDto[]> {
    return this.client.get<BookingDto[]>(`${this.apiUrl}/api/booking/user/${userId}`);
  }

  addBooking(booking: Booking): Observable<Booking> {
    return this.client.post<Booking>(`${this.apiUrl}/api/booking`, booking);
  }

  updateBooking(bookingId: string, booking: Booking): Observable<Booking> {
    return this.client.put<Booking>(`${this.apiUrl}/api/booking/${bookingId}`, booking);
  }

  deleteBooking(bookingId: string): Observable<void> {
    return this.client.delete<void>(`${this.apiUrl}/api/booking/${bookingId}`);
  }
}
