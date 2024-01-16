import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeData } from 'src/app/Models/HomeData';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { LoggedUserService } from '../LoggedUserService/LoggedUserService';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-mini-profile',
  templateUrl: './mini-profile.component.html',
  styleUrls: ['./mini-profile.component.scss']
})
export class MiniProfileComponent implements OnInit, OnDestroy {
  @Input() doctorData: HomeData | undefined;
  loggedUser = ''
  hours: Hours[] = [];
  minDate: Date | undefined;
  dateControl: FormControl = new FormControl(new Date().toISOString());
  subscription: Subscription = new Subscription;

  constructor(private router: Router, private loggedUserService: LoggedUserService, private toastr: ToastrService){};
  
  ngOnInit(): void {
    this.minDate = this.dateControl.value;
    this.hours = this.setHours(this.dateControl.value);

    this.subscription = this.dateControl.valueChanges.subscribe((value) => {
      this.hours = this.setHours(value);
    })

    this.subscription.add(this.loggedUserService.getLoggedUserSubject().subscribe((user: string) => {
      this.loggedUser = user;
    }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  navigateToReservation(hour: Hours): void {
    if (this.loggedUser !== '') {
      let date = new Date(this.dateControl.value);
      date.setHours(parseInt(hour.hour.split(':')[0]));
      date.setMinutes(parseInt(hour.hour.split(':')[1]));
      const queryParams = { date: date, doctorId: this.doctorData?.doctorId };
      this.router.navigate(['/reservation'], { queryParams });
    } else {
      this.toastr.error("Musisz być zalogowany", "Niepowodzenie");
    }
  }

  setHours(valueControl: string): Hours[] {
    const tempDate = new Date(new Date(valueControl).setHours(12));
    if (this.doctorData?.days.includes(tempDate.getDay())) return [];
    const controlDate = tempDate.toISOString().split('T')[0];
    let hours: Hours[] = [];
    this.doctorData?.hours.sort((a, b) => this.compareHours(a, b));
    this.doctorData?.hours.forEach(hour => {
      const time = _.take(hour.split(':'), 2).join(':');
      const choosenDate = this.doctorData?.associatedReservations.filter(r => r.reservationDate === controlDate);
        hours.push({hour: time, available: choosenDate && choosenDate.length === 0 ? true : <boolean>(choosenDate?.every(d => _.take(d.reservationHour.split(':'), 2).join(':') !== time))});
      });
    return hours;
  }

  navigateToDoctorProfile(): void {
    const queryParams = { id: this.doctorData?.doctorId };
    this.router.navigate(['/profile'], { queryParams });
  }
  
  compareHours(a: string, b: string): number {
  if (parseInt(a.split(':')[0]) > parseInt(b.split(':')[0])) { return 1};
  if (parseInt(a.split(':')[0]) < parseInt(b.split(':')[0])) { return -1};
  if (parseInt(a.split(':')[1]) > parseInt(b.split(':')[1])) { return 1};
  return -1;
  }
}


export interface Hours {
  hour: string;
  available: boolean;
}
