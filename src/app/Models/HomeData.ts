export interface HomeData {
    doctorId: string,
    name: string,
    surname: string,
    specialization: string,
    avatar?: string,
    city: string,
    street: string,
    buildingNumber: number,
    serviceName: string,
    servicePrice: number,
    days: Days[],
    hours: string[],
    associatedReservations: Reservations[]
}


export enum Days {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

export interface Reservations {
    doctorId: number;
    reservationDate: string,
    reservationHour: string,
    serviceType: string
}

export interface HomeDataRequest {
    searchedPhrase: string;
    searchedCity: string;
}