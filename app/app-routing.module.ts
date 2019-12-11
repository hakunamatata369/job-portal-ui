import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from './login/login.component';

// import { WelcomeComponent } from './welcome/welcome.component';

// import { InterviewerComponent } from './interviewer/interviewer.component';

// import { EditComponent } from './edit/edit.component';

import { InterviewComponent } from './interview/interview.component';
import { InterviewEditComponent } from './interview/interview-edit/interview-edit.component';

import { InterviewFeedbackComponent } from './interview/interview-feedback/interview-feedback.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'interview',
    component : InterviewComponent,
    children:[{path: '', component: InterviewComponent },

      ],
   },
   {
    path: 'interview/:id/edit',
    component: InterviewEditComponent
  },
  {
    path: 'interview/:id/feedback',
    component: InterviewFeedbackComponent
  }
  // {
  //   path: 'interviewer',
  //   component : InterviewerComponent
  // },
  // {
  //   path: 'edit/:id',
  //   component : EditComponent
  // }
  // { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
