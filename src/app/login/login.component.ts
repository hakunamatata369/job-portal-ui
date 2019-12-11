import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';



import { AuthService } from '../services/auth.service';

// import { ConstantsService } from '../services/constants.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage: string;
    pageTitle = 'Log In';
    selectedRole : String = '';
    userRoles : any[];
    selecteduserRole : String ='';

    constructor(private router: Router,) {
        //  private authService: AuthService
    }

    ngOnInit(){
        //this.userRoles = this.constantsService.User_roles;
    }

    cancel(): void {
        //this.router.navigate(['welcome']);
    }

    login(loginForm: NgForm): void {
        if (loginForm && loginForm.valid) {
            const userName = loginForm.form.value.userName;
            const password = loginForm.form.value.password;
            //const role = loginForm.form.value.selectedRole;
           // this.authService.login(userName, password);
            this.router.navigate(['/interview']);          
        } else {
            this.errorMessage = 'Please enter a user name and password.';
        }
    }
}
