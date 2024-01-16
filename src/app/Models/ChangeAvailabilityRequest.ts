import { Days } from "./HomeData";

export interface ChangeAvailabilityRequest {
    userId: number,
    days: Days[],
    hours: string[]
}