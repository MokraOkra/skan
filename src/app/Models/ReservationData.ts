export interface ReservationData {
    doctorId: string,
    name: string,
    surname: string,
    specialization: string,
    avatar?: string,
    city: string,
    street: string,
    buildingNumber: number,
    services: Services[]
}

export interface Services {
    serviceName: string,
    servicePrice: string
}