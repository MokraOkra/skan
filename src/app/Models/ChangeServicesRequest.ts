import { Services } from "./ReservationData";

export interface ChangeServicesRequest {
    userId: number,
    services: Services[]
}