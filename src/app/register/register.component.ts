import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../Services/UserService';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { RegisterRequest } from '../Models/RegisterRequest';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy{
  valid = false;
  registerGroup = new FormGroup({
    loginControl: new FormControl('', Validators.required),
    passwordControl: new FormControl('', Validators.required),
    confirmPasswordControl: new FormControl('', Validators.required),
    emailControl: new FormControl('', [Validators.required, Validators.email]),
    nameControl: new FormControl('', Validators.required),
    surnameControl: new FormControl('', Validators.required),
  });
  subscription = new Subscription();

  constructor(private router: Router, private userService: UserService, private toastr: ToastrService) {}

  ngOnInit(): void {
     this.subscription = this.registerGroup.statusChanges.subscribe(() => {
      this.valid = this.registerGroup.valid;
     })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
    async register(): Promise<void> {
      if (this.registerGroup.controls.passwordControl.value !== this.registerGroup.controls.confirmPasswordControl.value) {
        this.toastr.error('Hasła muszą być takie same', 'Niepowodzenie');
        return;
      }
      const registerData: RegisterRequest = {
        username: <string>this.registerGroup.controls.loginControl.value, 
        password: <string>this.registerGroup.controls.passwordControl.value, 
        email: <string>this.registerGroup.controls.emailControl.value,
        name: <string>this.registerGroup.controls.nameControl.value,
        surname: <string>this.registerGroup.controls.surnameControl.value
      }
      await lastValueFrom(this.userService.register(registerData)).then(() => {
      this.toastr.success("Pomyślne zarejerstrowano", "Sukces");
      this.router.navigate(['/login']);
    }).catch((error) => {
      this.toastr.error(error.statusText, "Niepowodzenie");
    });
    }
}
