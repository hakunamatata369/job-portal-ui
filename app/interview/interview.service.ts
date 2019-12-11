import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

//import { InterviewerData } from '../shared/InterviewerData';
@Injectable({
  providedIn: 'root'
})
export class InterviewService {
  private interviews;
  private interviewUrl = 'assets/InterviewApi/Interview.json';
  //private interviewUrl = 'api/InterviewApi/Interview.json';

  private selectedInterviewSource = new BehaviorSubject(null);
  selectedInterviewChanges$ = this.selectedInterviewSource.asObservable();

  constructor(private http: HttpClient) { }

  getinterviews(): Observable<any[]> {
    return this.http.get<any[]>(this.interviewUrl)
      .pipe(
       // tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getinterview(id: Number): Observable<any | undefined> {
    return this.getinterviews()
      .pipe(
        map((interviews: any[]) => interviews.find(p => p.interviewID === id))
      );
  }

  changeSelectedinterview(selectedInterview): void {
    this.selectedInterviewSource.next(selectedInterview);
}

saveinterview(interview: any): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  if (interview.interviewID === 0) {
      return this.createinterview(interview, headers);
  }
  return this.updateinterview(interview, headers);
}

deleteinterview(id: number): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  const url = `${this.interviewUrl}/${id}`;
  return this.http.delete<any>(url, { headers })
      .pipe(
          tap(data => console.log('deleteinterview: ' + id)),
          tap(data => {
              const foundIndex = this.interviews.findIndex(item => item.id === id);
              if (foundIndex > -1) {
                  this.interviews.splice(foundIndex, 1);
                  this.changeSelectedinterview(null);
              }
          }),
          catchError(this.handleError)
      );
}

private createinterview(interview, headers: HttpHeaders): Observable<any> {
  interview.interviewID = null;
  return this.http.post<any>(this.interviewUrl, interview, { headers })
      .pipe(
          tap(data => console.log('createinterview: ' + JSON.stringify(data))),
          tap(data => {
              // If the user selected to add before listing the interviews,
              // The interviews won't yet be retrieved.
              if (this.interviews) {
                  this.interviews.push(data);
              }
              this.changeSelectedinterview(data);
          }),
          catchError(this.handleError)
      );
}

private updateinterview(interview, headers: HttpHeaders): Observable<any> {
  const url = `${this.interviewUrl}/${interview.interviewID}`;
  return this.http.put<any>(url, interview, { headers })
      .pipe(
          tap(data => console.log('updateinterview: ' + interview.interviewID)),
          catchError(this.handleError)
      );
}

private initializeinterview() {
  // Return an initialized object
  return {
      id: 0,
      interviewName: '',
      interviewCode: '',
      category: '',
      tags: [],
      releaseDate: '',
      price: 0,
      description: '',
      starRating: 0,
      imageUrl: ''
  };
}

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
