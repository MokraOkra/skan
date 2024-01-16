import { Days } from "./HomeData";
import { Services } from "./ReservationData";
import { ReservationDetails } from "./ReservationDetails";
import { Role } from "./Role";

export interface ProfileResponse {
    name: string,
    surname: string,
    role: Role,
    specialization?: string,
    expirience?: string,
    avatar?: string,
    city?: string,
    street?: string,
    buildingNumber?: string,
    services?: Services[],
    days?: Days[],
    hours?: string[],
    associatedReservations: ReservationDetails[]
}