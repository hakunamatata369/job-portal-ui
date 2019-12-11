import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    loggeduser;
    redirectUrl: string;
    userRole: '';
    role: any;

    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    constructor() {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
     }

    isLoggedIn(): boolean {
        return !!this.currentUser;
    }

    setUserRole(who) {
        this.role = who;
    }

    getUserRole(): string {
        return this.role;
    }

    login(userName: string, password: string): void {
        // Code here would log into a back end service
        // and return user information
        // This is just hard-coded here.
        this.loggeduser = {
            id: 2,
            userName: userName,
        };
        localStorage.setItem('currentUser', JSON.stringify(this.loggeduser.userName));
        this.currentUserSubject.next(this.loggeduser.userName);
        // this.setUserRole();
        console.log(this.loggeduser);
    }

    logout(): void {
        this.currentUser = null;
    }
}
