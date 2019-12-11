import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { InterviewService } from '../../interview/interview.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-interview-edit',
  templateUrl: './interview-edit.component.html',
  styleUrls: ['./interview-edit.component.scss']
})
export class InterviewEditComponent implements OnInit {
  @ViewChild(NgForm, { static: true }) editForm: NgForm;
  pageTitle = 'Interview Edit';
  errorMessage: string;
  private originalInterview;
  interview;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  myDateValue: Date;
  constructor(public interviewService: InterviewService, private router: Router,
    private route: ActivatedRoute) { }

  get isDirty(): boolean {
    return this.editForm.dirty ? true : false;
  }
  ngOnInit() {
    this.route.params.subscribe(
      params => {
        const id = +params['id'];
        this.getinterview(id);
      }
    );
    this.dropdownList = [
      {
        "id": 701,
        "competency_type": "Angular",
        "rating": "5"
      },
      {
        "id": 701,
        "competency_type": "Java",
        "rating": "5"
      }, {
        "id": 701,
        "competency_type": "Python",
        "rating": "5"
      }, {
        "id": 701,
        "competency_type": "AWS",
        "rating": "5"
      }, {
        "id": 701,
        "competency_type": "owcs",
        "rating": "5"
      }
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'competency_type',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.myDateValue = new Date();
  }


  getinterview(id: number): void {
    this.interviewService.getinterview(id)
      .subscribe({
        next: interview => this.oninterviewRetrieved(interview),
        error: err => this.errorMessage = err
      });
  }

  onItemSelect(item: any) {
    console.log(item);
  }

  onSelectAll(items: any) {
    console.log(items);
  }

  oninterviewRetrieved(interview): void {
    // Reset back to pristine
    this.editForm.reset();

    // Display the data in the form
    // Use a copy to allow cancel.
    this.originalInterview = interview;
    this.interview = Object.assign({}, interview);

    if (this.interview.interviewID === 0) {
      this.pageTitle = 'Add Interview';
    } else {
      this.selectedItems = this.interview.competencies;
      this.pageTitle = `Edit Interview: ${this.interview.job.jobDescription} with Interview ID ${this.interview.interviewID}`;
    }
  }

  cancel(): void {
    // Navigate back to the interview list
    this.router.navigate(['/interview']);
  }

  deleteinterview(): void {
    if (this.interview.interviewID) {
      if (confirm(`Really delete the interview: ${this.interview.job.jobDescription}?`)) {
        this.interviewService.deleteinterview(this.interview.interviewID)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    } else {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    }
  }


  saveinterview(): void {
    console.log(this.editForm);
    if (this.editForm.valid) {
      this.interviewService.saveinterview(this.interview)
        .subscribe({
          next: () => {
            // Assign the changes from the copy
            Object.keys(this.interview).forEach(key =>
              this.originalInterview[key] = this.interview[key]
            );
            this.onSaveComplete();
          },
          error: err => this.errorMessage = err
        });
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    // Reset back to pristine
    this.editForm.reset(this.editForm.value);

    // Navigate back to the interview list
    this.router.navigate(['/interview']);
  }

  
  onDateChange(newDate: Date) {
    console.log(newDate);
  }

}
