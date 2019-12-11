import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { InterviewService } from '../../interview/interview.service';
import { StarRatingComponent } from 'ng-starrating';
@Component({
  selector: 'app-interview-feedback',
  templateUrl: './interview-feedback.component.html',
  styleUrls: ['./interview-feedback.component.scss']
})
export class InterviewFeedbackComponent implements OnInit {
  @ViewChild(NgForm, { static: true }) feedbackForm: NgForm;
  pageTitle = 'Interview Feedback';
  errorMessage: string;
  interview;
  myDateValue: Date;
  constructor(public interviewService: InterviewService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        const id = +params['id'];
        this.getinterview(id);
      }
    );
    this.myDateValue = new Date();
  }

  onDateChange(newDate: Date) {
    console.log(newDate);
  }

  getinterview(id: number): void {
    this.interviewService.getinterview(id)
      .subscribe({
        next: interview => this.interview = (interview),
        error: err => this.errorMessage = err
      });
  }

  cancel(){
      // Reset back to pristine
      this.feedbackForm.reset(this.feedbackForm.value);

      // Navigate back to the interview list
      this.router.navigate(['/interview']);
  }

  onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    alert(`Old Value:${$event.oldValue}, 
      New Value: ${$event.newValue}, 
      Checked Color: ${$event.starRating.checkedcolor}, 
      Unchecked Color: ${$event.starRating.uncheckedcolor}`);
  }

}
