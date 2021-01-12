import JodaClockService from "../../services/clock/JodaClockService";
import LeaveRepo from "./repo/LeaveRepo";
import LeaveAPI from "../../services/api/leaveapi/LeaveAPI";
import {useEffect, useState} from "react";
import {LeaveUI} from "./repo/LeaveUI";
import {setCallBack} from "../../services/setCallBack";

export const useMonthLeave = () => {
    const clockService = JodaClockService.getInstance()
    const leaveRepo = LeaveRepo.getInstance(LeaveAPI.getInstance(), clockService)
    const [leave, setLeave] = useState([] as LeaveUI[])
    const [startDate, setStartDate] = useState("2020-01-01")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        leaveRepo.fetchLeaveForMonth(startDate, setCallBack(setError, setLoading, setLeave)).then()
    }, [startDate])


    const nextMonth = () => {
        setStartDate(clockService.addMonthToAPIDate(startDate))
    }

    const previousMonth = () => {
        setStartDate(clockService.subMonthFromAPIDate(startDate))
    }

    return { leave, nextMonth, previousMonth, error, loading}
}
