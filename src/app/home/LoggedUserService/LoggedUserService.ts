import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class LoggedUserService {
    private loggedUser = new BehaviorSubject<string>('');

    public getLoggedUserSubject(): BehaviorSubject<string> {
        return this.loggedUser;
    }

    public updateLoggedUser(user: string): void {
        this.loggedUser.next(user);
    }
}