import {IClockService} from "./IClockService";
import {LocalDate} from "@js-joda/core";

const full_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

export default class JodaClockService implements IClockService{

    apiDateToPrettyDate(apiDate: string): string {
        let utc = LocalDate.parse(apiDate)
        let date = new Date(Date.UTC(utc.year(),utc.month().ordinal(), utc.dayOfMonth()) )
        return new Intl.DateTimeFormat('en-GB', full_date).format(date)
    }

}
