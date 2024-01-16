import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ReservationData } from "../Models/ReservationData";
import { Observable } from "rxjs";
import { ReservationRequest } from "../Models/ReservationRequest";

@Injectable({
    providedIn: 'root'
  })
export class ReservationService {
    private baseApi = 'http://localhost:5000/api/reservation';

    constructor(private http: HttpClient) {};

    getReservationData(doctorId: string): Observable<ReservationData> {
        return this.http.get<ReservationData>(`${this.baseApi}?doctorId=${doctorId}`);
    } 

    makeReservation(body: ReservationRequest): Observable<void>{
        const header = new HttpHeaders({
            'Content-Type': 'application/json'
          });
        return this.http.post<void>(`${this.baseApi}`, JSON.stringify(body), {headers: header});
    }

    removeReservation(id: number): Observable<void>{
      const header = new HttpHeaders({
          'Content-Type': 'application/json'
        });
      return this.http.post<void>(`${this.baseApi}/remove`, JSON.stringify(id), {headers: header});
  }
}