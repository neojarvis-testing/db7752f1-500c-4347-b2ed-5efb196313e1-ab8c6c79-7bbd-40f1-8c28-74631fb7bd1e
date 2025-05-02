import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.model';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-useraddfeedback',
  templateUrl: './useraddfeedback.component.html',
  styleUrls: ['./useraddfeedback.component.css']
})
export class UseraddfeedbackComponent implements OnInit {

  feedbacks: Feedback[] = [];
  feedback: Feedback = {
    userId: 0,
    feedbackText: '',
    date: undefined
  };
  userName: string = '';
  showThankYou: boolean = false;


  constructor(
    private feedbackService: FeedbackService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userName = this.authService.getUserName();
    this.loadUserFeedbacks();
  }

  loadUserFeedbacks(): void {
    const userId = this.authService.getUserId();

    this.feedbackService.getAllFeedbacksByUserId(userId).subscribe({
      next: (feedbackList) => {

        this.feedbacks = feedbackList.sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateB - dateA; 
        });
      },
      error: (error) => console.error('Failed to load feedbacks:', error)
    });

  }


  onSubmit(): void {
    const userId = this.authService.getUserId();
    const trimmedText = this.feedback.feedbackText.trim();

    if (userId > 0 && trimmedText) {
      const newFeedback: Feedback = {
        feedbackText: trimmedText,
        userId: userId,
        date: new Date()
      };

      this.feedbackService.sendFeedback(newFeedback).subscribe({
        next: () => {
          this.feedback.feedbackText = ''; 
          this.loadUserFeedbacks();        
          this.showThankYou = true;

          setTimeout(() => {
            this.showThankYou = false;
          }, 3000);
        },
        error: (error) => console.error('Failed to add feedback:', error)
      });
    }
  }

  // Delete feedback by ID
  onDelete(feedbackId: number): void {
    if (feedbackId) {
      this.feedbackService.deleteFeedback(feedbackId).subscribe({
        next: () => this.loadUserFeedbacks(),
        error: (error) => console.error('Failed to delete feedback:', error)
      });
    }
  }
}
