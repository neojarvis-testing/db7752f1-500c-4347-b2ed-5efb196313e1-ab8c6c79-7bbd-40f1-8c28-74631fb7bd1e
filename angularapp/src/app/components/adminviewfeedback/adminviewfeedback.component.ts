import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-adminviewfeedback',
  templateUrl: './adminviewfeedback.component.html',
  styleUrls: ['./adminviewfeedback.component.css']
})
export class AdminviewfeedbackComponent implements OnInit {
  feedbacks:Feedback[]=[];
  constructor(private service:FeedbackService,private router:Router) { }

  ngOnInit(): void {
    this.loadBooking();
  }

  loadBooking(){
    this.service.getFeedbacks().subscribe(data=>{
      console.log(data);
      
      this.feedbacks=data;
    });
  }

  ShowProfile(){}



}
