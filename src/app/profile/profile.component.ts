import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfileResponse } from '../Models/ProfileResponse';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { UserService } from '../Services/UserService';
import { LoggedUserService } from '../home/LoggedUserService/LoggedUserService';
import { Role } from '../Models/Role';
import { ReservationDetails } from '../Models/ReservationDetails';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ReservationService } from '../Services/ReservationService';
import { ToastrService } from 'ngx-toastr';
import { ChangePasswordDialogComponent, PasswordInputs } from './change-password-dialog/change-password-dialog.component';
import { ChangePasswordRequest } from '../Models/ChangePasswordRequest';
import { ChangeAvatarRequest } from '../Models/ChangeAvatarRequest';
import { ChangeAvatarDialogComponent } from './change-avatar-dialog/change-avatar-dialog.component';
import { AddressInputs, ChangeAddressDialogComponent } from './change-address-dialog/change-address-dialog.component';
import { ChangeAddressRequest } from '../Models/ChangeAddressRequest';
import { ChangeExpierienceDialogComponent } from './change-expierience-dialog/change-expierience-dialog.component';
import { ChangeExperienceRequest } from '../Models/ChangeExperienceRequest';
import { AvailabilityInputs, ChangeAvailabilityDialogComponent } from './change-availability-dialog/change-availability-dialog.component';
import { ChangeAvailabilityRequest } from '../Models/ChangeAvailabilityRequest';
import { ChangeServicesDialogComponent } from './change-services-dialog/change-services-dialog.component';
import { Services } from '../Models/ReservationData';
import { ChangeServicesRequest } from '../Models/ChangeServicesRequest';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  loggedUser = '';
  isOwnProfile = true;
  profileData: ProfileResponse = {
    name: '',
    surname: '',
    associatedReservations: [],
    role: Role.User
  }
  isDoctor = false;
  days: string[] = [];

  constructor(private toastr: ToastrService, private route: ActivatedRoute, private userService: UserService, private reservationService: ReservationService, private loggedUserService: LoggedUserService, private dialog: MatDialog) {};

  async ngOnInit(): Promise<void> {
    const currentUser = this.loggedUserService.getLoggedUserSubject().getValue();
    const id = this.route.snapshot.queryParams['id'] ?? '';
    this.isOwnProfile = (currentUser == id && currentUser !== '');
    this.profileData = await lastValueFrom(this.userService.profile(id));
    this.isDoctor = this.profileData.role === Role.Doctor;
  }

  openReservationDialog(reservation: ReservationDetails): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        await lastValueFrom(this.reservationService.removeReservation(reservation.reservationId)).then(() => {
          this.toastr.success("Pomyślnie anulowano rezerwację", "Sukces");
          this.profileData.associatedReservations = this.profileData.associatedReservations.filter(r => r.reservationId !== reservation.reservationId);
        }).catch((error) => {
          this.toastr.error(error.statusText, "Niepowodzenie");
        });
      }
    });
  }

  openPasswordDialog(): void {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(async (result: PasswordInputs) => {
      if (result && result.password === result.password2) {
        const body: ChangePasswordRequest = {
          userId: parseInt(this.loggedUserService.getLoggedUserSubject().getValue()),
          password: result.password
        }
        await lastValueFrom(this.userService.changePassword(body)).then(() => {
          this.toastr.success("Pomyślnie zmieniono hasło", "Sukces");
        }).catch((error) => {
          this.toastr.error(error.statusText, "Niepowodzenie");
        });
      }
    });
  }

  openAvatarDialog(): void {
    const dialogRef = this.dialog.open(ChangeAvatarDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(async (result: string) => {
      if (result) {
        const body: ChangeAvatarRequest = {
          userId: parseInt(this.loggedUserService.getLoggedUserSubject().getValue()),
          avatar: result
        }
        await lastValueFrom(this.userService.changeAvatar(body)).then(() => {
          this.toastr.success("Pomyślnie zmieniono awatar", "Sukces");
          this.profileData.avatar = result;
        }).catch((error) => {
          this.toastr.error(error.statusText, "Niepowodzenie");
        });
      }
    });
  }

  openAddressDialog(): void {
    const dialogRef = this.dialog.open(ChangeAddressDialogComponent, {
      width: '500px',
      data:  {
        city: this.profileData.city,
        street: this.profileData.street,
        building: this.profileData.buildingNumber,
      }
    });

    dialogRef.afterClosed().subscribe(async (result: AddressInputs) => {
      if (result) {
        const body: ChangeAddressRequest = {
          userId: parseInt(this.loggedUserService.getLoggedUserSubject().getValue()),
          city: result.city,
          street: result.street,
          buildingNumber: result.building
          
        }
        await lastValueFrom(this.userService.changeAddress(body)).then(() => {
          this.toastr.success("Pomyślnie zmieniono awatar", "Sukces");
          this.profileData.city = result.city;
          this.profileData.street = result.street;
          this.profileData.buildingNumber = result.building.toString();
        }).catch((error) => {
          this.toastr.error(error.statusText, "Niepowodzenie");
        });
      }
    });
  }

  openServicesDialog(): void {
    const dialogRef = this.dialog.open(ChangeServicesDialogComponent, {
      width: '500px',
      data:  {
        services: this.profileData.services
      }
    });

    dialogRef.afterClosed().subscribe(async (result: Services[]) => {
      if (result) {
        const body: ChangeServicesRequest = {
          userId: parseInt(this.loggedUserService.getLoggedUserSubject().getValue()),
          services: result
        }
        await lastValueFrom(this.userService.changeServices(body)).then(() => {
          this.toastr.success("Pomyślnie zmieniono awatar", "Sukces");
          this.profileData.services = result;
        }).catch((error) => {
          this.toastr.error(error.statusText, "Niepowodzenie");
        });
      }
    });
  }

  openExpierienceDialog(): void {
    const dialogRef = this.dialog.open(ChangeExpierienceDialogComponent, {
      width: '500px',
      data: this.profileData.expirience
    });

    dialogRef.afterClosed().subscribe(async (result: string) => {
      if (result) {
        const body: ChangeExperienceRequest = {
          userId: parseInt(this.loggedUserService.getLoggedUserSubject().getValue()),
          expierience: result
          
        }
        await lastValueFrom(this.userService.changeExpierience(body)).then(() => {
          this.toastr.success("Pomyślnie zmieniono doświadczenie", "Sukces");
          this.profileData.expirience = result;
        }).catch((error) => {
          this.toastr.error(error.statusText, "Niepowodzenie");
        });
      }
    });
  }

  openAvailabilityDialog(): void {
    const dialogRef = this.dialog.open(ChangeAvailabilityDialogComponent, {
      width: '500px',
      data: {days: this.profileData.days, hours: this.profileData.hours}
    });

    dialogRef.afterClosed().subscribe(async (result: AvailabilityInputs) => {
      if (result) {
        const body: ChangeAvailabilityRequest = {
          userId: parseInt(this.loggedUserService.getLoggedUserSubject().getValue()),
          days: result.days,
          hours: result.hours
        }
        await lastValueFrom(this.userService.changeAvailability(body)).then(() => {
          this.toastr.success("Pomyślnie zmieniono dostępność", "Sukces");
          this.profileData.days = result.days;
          this.profileData.hours = result.hours;
        }).catch((error) => {
          this.toastr.error(error.statusText, "Niepowodzenie");
        });
      }
    });
  }

  returnDay(value: number): string {
    switch (value) {
      case 0:
          return "Niedziela";
      case 1:
          return "Poniedziałek";
      case 2:
          return "Wtorek";
      case 3:
          return "Środa";
      case 4:
          return "Czwartek";
      case 5:
          return "Piątek";
      case 6:
          return "Sobota";
      default:
        return 'Niedziela';
    }
  }
}
