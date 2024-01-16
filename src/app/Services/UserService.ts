import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HomeData, HomeDataRequest } from "../Models/HomeData";
import { Observable } from "rxjs";
import { LoginRequest } from "../Models/LoginRequest";
import { RegisterRequest } from "../Models/RegisterRequest";
import { ProfileResponse } from "../Models/ProfileResponse";
import { ChangePasswordRequest } from "../Models/ChangePasswordRequest";
import { ChangeAvatarRequest } from "../Models/ChangeAvatarRequest";
import { ChangeAddressRequest } from "../Models/ChangeAddressRequest";
import { ChangeExperienceRequest } from "../Models/ChangeExperienceRequest";
import { ChangeAvailabilityRequest } from "../Models/ChangeAvailabilityRequest";
import { ChangeServicesRequest } from "../Models/ChangeServicesRequest";

@Injectable({
    providedIn: 'root'
  })
export class UserService {
    private baseApi = 'http://localhost:5000/api/user';

    constructor(private http: HttpClient) {};

    getHomeData(phrase?: string, city?: string): Observable<Array<HomeData>> {
        return this.http.get<Array<HomeData>>(`${this.baseApi}/home?phrase=${phrase}&city=${city}`);
    } 

    login(body: LoginRequest): Observable<string> {
        const header = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post<string>(`${this.baseApi}/login`, JSON.stringify(body), {headers: header});
    } 

    register(body: RegisterRequest): Observable<void> {
        const header = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post<void>(`${this.baseApi}/register`, JSON.stringify(body), {headers: header});
    } 

    changePassword(body: ChangePasswordRequest): Observable<void> {
        const header = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post<void>(`${this.baseApi}/changePassword`, JSON.stringify(body), {headers: header});
    } 

    changeAvatar(body: ChangeAvatarRequest): Observable<void> {
        const header = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post<void>(`${this.baseApi}/changeAvatar`, JSON.stringify(body), {headers: header});
    } 

    changeAddress(body: ChangeAddressRequest): Observable<void> {
        const header = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post<void>(`${this.baseApi}/changeAddress`, JSON.stringify(body), {headers: header});
    } 

    changeServices(body: ChangeServicesRequest): Observable<void> {
        const header = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post<void>(`${this.baseApi}/changeServices`, JSON.stringify(body), {headers: header});
    } 

    changeExpierience(body: ChangeExperienceRequest): Observable<void> {
        const header = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post<void>(`${this.baseApi}/changeExperience`, JSON.stringify(body), {headers: header});
    } 

    changeAvailability(body: ChangeAvailabilityRequest): Observable<void> {
        const header = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post<void>(`${this.baseApi}/changeAvailability`, JSON.stringify(body), {headers: header});
    }

    profile(id: string): Observable<ProfileResponse> {
        const header = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post<ProfileResponse>(`${this.baseApi}/profile`, JSON.stringify(id), {headers: header});
    } 
}