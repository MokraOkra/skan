export interface ReservationRequest {
    userId: string,
    doctorId: string, 
    reservationDate: string,
    reservationHour: string,
    ServiceType: string
}