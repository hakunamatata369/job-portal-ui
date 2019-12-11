import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { InterviewService } from '../interview.service';


import { Subscription } from 'rxjs';


@Component({
  selector: 'app-interview-details',
  templateUrl: './interview-details.component.html',
  styleUrls: ['./interview-details.component.scss']
})
export class InterviewDetailsComponent implements OnInit {
  pageTitle = 'Interview Detail';
  errorMessage = '';
  interview ;
  selectedInterview;
  sub: Subscription;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private interviewService: InterviewService) { }

  ngOnInit() {
    this.sub = this.interviewService.selectedInterviewChanges$.subscribe(
      selectedProduct => {
        this.interview = selectedProduct
      }      
  );
  }

  onEdit(){
    
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }
}
