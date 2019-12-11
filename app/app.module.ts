import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import { WelcomeComponent } from './welcome/welcome.component';

//import {MatCheckboxModule} from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';


//import { MatPaginatorModule, MatFormFieldModule, MatTableModule, MatInputModule, MatDialogModule,MatBadgeModule  } from '@angular/material';
//import {MatIconModule} from '@angular/material/icon';
//import { KeysPipe } from './shared/keys.pipe';
//import { ValuesPipe } from './shared/values.pipe';
//import { InterviewerComponent } from './interviewer/interviewer.component';
//import { DialogComponent } from './shared/dialog/dialog.component';
// import { EditComponent } from './edit/edit.component';


import { InterviewModule} from './interview/interview.module';
import { InterviewFeedbackComponent } from './interview/interview-feedback/interview-feedback.component';
//import { StarRatingComponent } from './shared/star-rating/star-rating.component';
import { StarRatingComponent } from 'ng-starrating';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // WelcomeComponent,
    // KeysPipe,
    // ValuesPipe,
    // InterviewerComponent,
    // DialogComponent,
    // EditComponent,
    InterviewFeedbackComponent,
    StarRatingComponent,
    HeaderComponent,
    FooterComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    // MatPaginatorModule,
    // MatTableModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatCheckboxModule,
    // MatIconModule,
    // MatDialogModule,
    // MatBadgeModule,
    BrowserAnimationsModule,
    InterviewModule,    
    HttpClientModule,
    BsDatepickerModule.forRoot(),
  ],
//   entryComponents: [DialogComponent],
  exports: [
    //DialogComponent
    
   
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
