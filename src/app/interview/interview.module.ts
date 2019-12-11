import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


import { InterviewListComponent } from './interview-list/interview-list.component';
import { InterviewDetailsComponent } from './interview-details/interview-details.component';
import { InterviewEditComponent } from './interview-edit/interview-edit.component';
import { InterviewComponent } from './interview.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    InterviewListComponent,
    InterviewDetailsComponent,
    InterviewEditComponent,
    InterviewComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    BsDatepickerModule.forRoot(),
  ]
})
export class InterviewModule { }
