import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { UserDTO } from 'src/app/models/user-dto.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-adminviewfeedback',
  templateUrl: './adminviewfeedback.component.html',
  styleUrls: ['./adminviewfeedback.component.css']
})
export class AdminviewfeedbackComponent implements OnInit {

  feedbacks: Feedback[] = [];
  showModal = false;
  isLoading = false;
  selectedUser: UserDTO | null = null;

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.fetchFeedbacks();
  }

  fetchFeedbacks(): void {
    this.feedbackService.getFeedbacks().subscribe(data => {
      this.feedbacks = data;
    });
  }

  viewUserProfile(userId: number): void {
    this.showModal = true;
    this.isLoading = true;
    this.selectedUser = null;

    this.feedbackService.getUserDetailsById(userId).subscribe(user => {
      this.selectedUser = user;
      this.isLoading = false;
    }, err => {
      console.error('Error fetching user:', err);
      this.isLoading = false;
    });
  }

  closeModal(): void {
    this.showModal = false;
  }
}