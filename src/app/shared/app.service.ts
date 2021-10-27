import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { User } from "../model/user";


@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private dialog: MatDialog, private router: Router) {}

  redirectUrl: string;

  isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }

  setLoggedInUser(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    console.log(user);
  }

  getToken() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser ? currentUser.token : '';
  }
  getLoggedInUserRoles() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser.claims;
  }

  getLoggedInUser() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser;
  }

  getLoggedInUserApplicationKey() {
    return localStorage.getItem('applicationKey');
  }
  cleanSession() {
    localStorage.removeItem('applicationKey');
    localStorage.removeItem('currentUser');
  }
  logout() {
    const appKey = this.getLoggedInUserApplicationKey();
    this.router.navigate(['/login', appKey]);
  }
}