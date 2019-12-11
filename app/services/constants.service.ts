import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  readonly User_roles = ['Admin', 'Recruiter', 'Interviwer'];
  readonly Recruiter_func = ['Post a Job', 'Search a job', 'Settings'];
  readonly CompanyColumns = ['companyId', 'companyName', 'companyLogo', 'companyWebsite'];

  constructor() { }
}
