import { Component, OnInit } from '@angular/core';
import { BookingDto } from 'src/app/models/booking-dto.model';
import { Feedback } from 'src/app/models/feedback.model';
import { DashboardSummary } from 'src/app/models/dashboard-summary.model';
import { FeedbackService } from 'src/app/services/feedback.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  summary: DashboardSummary = {
    totalUsers: 0,
    totalRooms: 0,
    totalBookings: 0,
    totalPending: 0,
    totalConfirmed: 0,
    totalRejected: 0,
    totalFeedbacks: 0
  };

  recentBookings: BookingDto[] = [];
  recentFeedbacks: Feedback[] = [];

  loading: boolean = true;

  constructor(private roomService: RoomService, private feedbackService: FeedbackService) { }

  ngOnInit(): void {
    this.loading = true;


    this.roomService.getSummary().subscribe(res => {
      this.summary = res;
      this.checkIfDataLoaded();
    });

    this.roomService.getAllBookings().subscribe(res => {
      this.recentBookings = res.reverse().slice(0, 5);
      this.checkIfDataLoaded();
    });


    this.feedbackService.getFeedbacks().subscribe(res => {
      this.recentFeedbacks = res.reverse().slice(0, 5);
      this.checkIfDataLoaded();
    });
  }

  checkIfDataLoaded(): void {

    if (this.summary && this.recentBookings.length > 0 && this.recentFeedbacks.length > 0) {
      this.loading = false;
      console.log(this.summary);
      console.log(this.recentBookings);
      console.log(this.recentFeedbacks);

    }
  }


}
