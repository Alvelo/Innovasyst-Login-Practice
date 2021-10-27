import { Component, OnInit, ElementRef,ViewChild } from '@angular/core';
import { environment } from '../../environments/environment';
import {ApiService} from '../shared/api.service';
import { FormGroup, FormControl, NgForm, Validators } from '@angular/forms';
import { User } from '../model/user';
import { AppService } from '../shared/app.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  //@ViewChild('inputUserName') inputUserName: ElementRef;
  env = environment;

  reactiveForm: FormGroup;

  loading = false;

  application = 'BdFXcBGrlk';

  constructor(
    private api: ApiService,
    private app: AppService,
    private router: Router
  ) {
		this.app.cleanSession();
    this.init();
  }

  async ngOnInit() {
    // this.inputUserName.nativeElement.focus();
  }

  async onSubmit() {
    try {
      //console.log(this.reactiveForm.value);
      this.loading = true;
      const res: User = await this.api.login(this.reactiveForm.value);
      //console.log(res);
			this.app.setLoggedInUser(res);
		
			this.loading = false;
			const redirect = this.app.redirectUrl ? this.app.redirectUrl : '/home';
			this.router.navigate([redirect]);
			

    } catch (error) {
      //console.log('No entro');
      this.loading = false;
    }
  }

  init() {
    this.reactiveForm = new FormGroup({
      applicationKey: new FormControl(this.application, [Validators.required]),
      userName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
      ]),
      userType: new FormControl('ADMIN', [Validators.required]),
    });
  }
}
