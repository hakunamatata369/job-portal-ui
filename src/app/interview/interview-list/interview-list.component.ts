import { Component, OnInit } from '@angular/core';

import { InterviewService } from '../interview.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-interview-list',
  templateUrl: './interview-list.component.html',
  styleUrls: ['./interview-list.component.scss']
})
export class InterviewListComponent implements OnInit {
  pageTitle: string = "InterView List";
  interviews;
  errorMessage = '';
  selectedInterview;
  sub: Subscription;

  constructor(public interviewService: InterviewService) { }

  ngOnInit() {
    this.sub = this.interviewService.selectedInterviewChanges$.subscribe(
      selectedinterview => this.selectedInterview = selectedinterview
    );

    this.interviewService.getinterviews().subscribe({
      next: (interviews) => {
        this.interviews = interviews;
      },
      error: err => this.errorMessage = err
    });
  }

  onSelected(interview): void {
    this.interviewService.changeSelectedinterview(interview);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


}
