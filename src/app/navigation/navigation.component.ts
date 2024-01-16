import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoggedUserService } from '../home/LoggedUserService/LoggedUserService';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
  isLogged = false;
  user = ''
  searchedPhrase = new FormControl('');
  searchesCity = new FormControl('');
  subscription = new Subscription();

  constructor(private router: Router, private loggedUserService: LoggedUserService, private toastr: ToastrService){ };
  
  ngOnInit(): void {
    this.subscription = this.loggedUserService.getLoggedUserSubject().subscribe((user: string) => {
      this.isLogged = user !== '';
      this.user = user;
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  navigateToProfile(): void {
    const queryParams = { id: this.user };
    this.router.navigate(['/profile'], {queryParams});
  }
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
  navigateToHome(): void {
    if (this.searchedPhrase || this.searchesCity) {
      const queryParams = { phrase: this.searchedPhrase.value, city: this.searchesCity.value };
      this.router.navigate(['/home'], { queryParams });
    }
  }
  logout(): void {
    this.loggedUserService.updateLoggedUser('');
    this.toastr.success("Pomyślnie wylogowano", "Sukces");
    this.router.navigate(['/home']);
  }
}
