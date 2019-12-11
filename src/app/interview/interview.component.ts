import { Component, OnInit, OnDestroy } from '@angular/core';

import { InterviewService } from './interview.service';
import { InterviewListComponent } from './interview-list/interview-list.component';
import { InterviewDetailsComponent } from './interview-details/interview-details.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.scss']
})
export class InterviewComponent implements OnInit {
  sub: Subscription;
  constructor(public interviewService: InterviewService) { }

  ngOnInit() {
    this.sub = this.interviewService.selectedInterviewChanges$.subscribe(
      selectedProduct => {
          if (selectedProduct) {
              // const start = new Date(selectedProduct.releaseDate);
              // const now = new Date();
          } else {
              // this.monthCount = 0;
          }
      });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
}
}
