import {Leave} from "../api/classes/Leave";

export interface IClockService {
    apiDateToPrettyDate(apiDate:string): string
}
