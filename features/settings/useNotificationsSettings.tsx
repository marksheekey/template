import JodaClockService from "../../services/clock/JodaClockService";
import SettingsRepo from "./repo/SettingsRepo";
import LeaveAPI from "../../services/api/leaveapi/LeaveAPI";
import {useEffect, useState} from "react";
import {SettingsUI} from "./repo/SettingsUI";
import {Callback} from "../../services/Callback";

export const useNotificationsSettings = () => {
    const clockService = new JodaClockService()
    const leaveRepo = new SettingsRepo(new LeaveAPI(), clockService)
    const [leave, setLeave] = useState([] as SettingsUI[])
    const [startDate, setStartDate] = useState("2020-01-01")
    useEffect(() => {
        leaveRepo.fetchLeaveForMonth(startDate, new class implements Callback {
            onLoading(loading: boolean) {
                // maybe use app context to show / hide a loader
                // or do something within this component
                console.log("loading", loading)
            }

            onError(message: string) {
                // maybe use app context to show / hide an error message
                // or do something within this component
                console.log("error", message)
            }

            onResult(data: SettingsUI[]) {
                //pass this data to the view
                setLeave(data)
            }
        })
    }, [startDate])

    const nextMonth = () => {
        setStartDate(clockService.addMonthToAPIDate(startDate))
    }

    const previousMonth = () => {
        setStartDate(clockService.subMonthFromAPIDate(startDate))
    }

    return { leave, nextMonth, previousMonth}
}
