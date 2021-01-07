import {Leave} from "../api/classes/Leave";

export interface IClockService {
    apiDateToPrettyDate(apiDate:string): string
    addMonthToAPIDate(date: string): string
    subMonthFromAPIDate(date: string): string
    finalAPIDateOfMonth(date: string): string
}
