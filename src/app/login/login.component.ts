import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, lastValueFrom } from 'rxjs';
import { UserService } from '../Services/UserService';
import { LoginRequest } from '../Models/LoginRequest';
import { LoggedUserService } from '../home/LoggedUserService/LoggedUserService';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  userId = '';
  valid = false;
  loginGroup = new FormGroup({
    loginControl: new FormControl('', Validators.required),
    passwordControl: new FormControl('', Validators.required)
  });
  subscription = new Subscription();

  constructor(private router: Router, private userService: UserService, private loggedUser: LoggedUserService, private toastr: ToastrService) {}

  ngOnInit(): void {
     this.subscription = this.loginGroup.statusChanges.subscribe(() => {
      this.valid = this.loginGroup.valid;
     })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async login(): Promise<void> {
    const loginData: LoginRequest = {
      username: <string>this.loginGroup.controls.loginControl.value, 
      password: <string>this.loginGroup.controls.passwordControl.value
    }
    await lastValueFrom(this.userService.login(loginData)).then((user: string) => {
      this.loggedUser.updateLoggedUser(user);
      this.toastr.success("Pomyślne logowanie", "Sukces");
      this.router.navigate(['/home']);
    }).catch((error) => {
      this.toastr.error(error.statusText, "Niepowodzenie");
    });
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}
