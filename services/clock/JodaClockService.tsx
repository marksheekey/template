import {IClockService} from "./IClockService";
import {LocalDate} from "@js-joda/core";

const full_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

export default class JodaClockService implements IClockService{
    apiDateToMillis(date: string): number {
        console.log("date:",date)
        let jDate = LocalDate.parse(date)
        let hDate = new Date(jDate.year(),jDate.month().ordinal(),jDate.dayOfMonth())
        console.log("jdate:",jDate)
        console.log("hDate",hDate)
        console.log("millis",hDate.getTime())
        return hDate.getTime() / 1000
    }
    finalAPIDateOfMonth(date: string): string {
        let utc = LocalDate.parse(date).plusMonths(1)
        return this.toAPIFormat(utc.minusDays(1))
    }

    apiDateToPrettyDate(apiDate: string): string {
        let utc = LocalDate.parse(apiDate)
        let date = new Date(Date.UTC(utc.year(),utc.month().ordinal(), utc.dayOfMonth()) )
        return new Intl.DateTimeFormat('en-GB', full_date).format(date)
    }

    addMonthToAPIDate(date: string): string {
        let utc = LocalDate.parse(date).plusMonths(1)
        return this.toAPIFormat(utc)
    }

    subMonthFromAPIDate(date: string): string {
        let utc = LocalDate.parse(date).minusMonths(1)
        return this.toAPIFormat(utc)
    }


    toAPIFormat(date: LocalDate): string{
        let month = date.month().value().toString()
        let day = date.dayOfMonth().toString()
        if(date.month().value() < 10){
            month = "0"+month
        }
        if(date.dayOfMonth() < 10){
            day = "0"+day
        }
        return date.year()+"-"+month+"-"+day;
    }

}
