import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from '../models/room.model';
import { Observable, throwError } from 'rxjs';
import { Booking } from '../models/booking.model';
import { BookingDto } from '../models/booking-dto.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RoomService {

  apiUrl:string = environment.apiUrl;
  
  constructor(private client:HttpClient) { }

  private getAuthHeaders():HttpHeaders{
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({'Authorization':`Bearer ${token}`});
  }

  getAllRooms():Observable<Room[]>{
    return this.client.get<Room[]>(`${this.apiUrl}/api/room`, {headers: this.getAuthHeaders()});
  }

  getRoomById(roomId:string):Observable<Room>{
    return this.client.get<Room>(`${this.apiUrl}/api/room/${roomId}`, {headers: this.getAuthHeaders()});
  }

  addRoom(room:Room):Observable<Room>{
    return this.client.post<Room>(`${this.apiUrl}/api/room`, room, {headers: this.getAuthHeaders()});
  }

  updateRoom(roomId:number, room:Room):Observable<Room>{
    return this.client.put<Room>(`${this.apiUrl}/api/room/${roomId}`, room, {headers: this.getAuthHeaders()});
  }

  deleteRoom(roomId: number): Observable<void> {
    return this.client.delete<void>(`${this.apiUrl}/api/room/${roomId}`, { headers: this.getAuthHeaders()})
  }

  
  getAllBookings():Observable<BookingDto[]>{
    
    return this.client.get<BookingDto[]>(`${this.apiUrl}/api/booking`, {headers: this.getAuthHeaders()});
  }

  getBookingsByUserId(userId:string):Observable<BookingDto[]>{
    return this.client.get<BookingDto[]>(`${this.apiUrl}/api/booking/user/${userId}`, {headers: this.getAuthHeaders()});
  }

  addBooking(booking:Booking):Observable<Booking>{
    return this.client.post<Booking>(`${this.apiUrl}/api/booking`, booking, {headers: this.getAuthHeaders()});
  }

  updateBooking(bookingId:string, booking:Booking):Observable<Booking>{
    return this.client.put<Booking>(`${this.apiUrl}/api/booking/${bookingId}`, booking, {headers: this.getAuthHeaders()});
  }

  deleteBooking(bookingId:string):Observable<void>{
    return this.client.delete<void>(`${this.apiUrl}/api/booking/${bookingId}`, {headers: this.getAuthHeaders()});
  }
}
