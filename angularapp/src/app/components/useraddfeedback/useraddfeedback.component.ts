import { Component } from '@angular/core';

@Component({
  selector: 'app-useraddfeedback',
  templateUrl: './useraddfeedback.component.html',
  styleUrls: ['./useraddfeedback.component.css']
})
export class UseraddfeedbackComponent {
  feedbackText: string = ''; // Holds the feedback entered
  feedbackTouched: boolean = false; // Tracks if the feedback field was interacted with
  showPopup: boolean = false; // Controls visibility of the popup

  submitFeedback() {
    this.feedbackTouched = true; // Mark feedback as touched
    if (this.feedbackText.trim()) {
      this.showPopup = true; // Show popup only if valid feedback is entered
    }
  }

  closePopup() {
    this.showPopup = false; // Hide popup
    this.feedbackText = ''; // Reset feedback
    this.feedbackTouched = false; // Reset validation state
  }
}
