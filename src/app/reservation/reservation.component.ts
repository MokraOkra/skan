import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../Services/ReservationService';
import { lastValueFrom } from 'rxjs';
import { ReservationData } from '../Models/ReservationData';
import { ReservationRequest } from '../Models/ReservationRequest';
import { ToastrService } from 'ngx-toastr';
import { LoggedUserService } from '../home/LoggedUserService/LoggedUserService';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  reservationData: ReservationData = {
    doctorId: '',
    name: '',
    surname: '',
    specialization: '',
    city: '',
    street: '',
    buildingNumber: 0,
    services: []
  };
  date = '';
  time = '';
  choosenService = '';

  constructor (private route: ActivatedRoute, private reservationService: ReservationService, private router: Router, private toastr: ToastrService, private loggedUserService: LoggedUserService) {}

  async ngOnInit(): Promise<void> {
    this.date = new Date(this.route.snapshot.queryParams['date']).toLocaleDateString();
    this.time = new Date(this.route.snapshot.queryParams['date']).toLocaleTimeString();
    const doctorId = this.route.snapshot.queryParams['doctorId'];
    this.reservationData = await lastValueFrom(this.reservationService.getReservationData(doctorId));
  }

  async confirmReservation(): Promise<void> {
    const date = this.date.split('.');
    const reservationRequest: ReservationRequest = {
      userId: this.loggedUserService.getLoggedUserSubject().getValue(),
      doctorId: this.reservationData.doctorId,
      reservationDate: `${date[2]}-${date[1]}-${date[0]}`,
      reservationHour: this.time,
      ServiceType: this.choosenService
    }
    await lastValueFrom(this.reservationService.makeReservation(reservationRequest)).then(() => {
      this.toastr.success("Pomyślnie dodano rezerwację", "Sukces");
      this.router.navigate(['/home']);
    }).catch((error) => {
      this.toastr.error(error.statusText, "Niepowodzenie");
    });
  }
}