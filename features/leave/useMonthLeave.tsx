import JodaClockService from "../../services/clock/JodaClockService";
import LeaveRepo from "./repo/LeaveRepo";
import LeaveAPI from "../../services/api/leaveapi/LeaveAPI";
import {useEffect, useState} from "react";
import {LeaveUI} from "./repo/LeaveUI";
import {setCallBack} from "../../services/setCallBack";
import {useError} from "../../global/ErrorContext";

export const useMonthLeave = () => {
    const clockService = JodaClockService.getInstance()
    const leaveRepo = LeaveRepo.getInstance(LeaveAPI.getInstance(), clockService)
    const [leave, setLeave] = useState([] as LeaveUI[])
    const [startDate, setStartDate] = useState("2020-01-01")
    const [loading, setLoading] = useState(false)
    const { addError } = useError();

    useEffect(() => {
        leaveRepo.fetchLeaveForMonth(startDate, setCallBack(addError, setLoading, setLeave)).then()
    }, [startDate])


    const nextMonth = () => {
        setStartDate(clockService.addMonthToAPIDate(startDate))
        addError("Leave: Next")
    }

    const previousMonth = () => {
        setStartDate(clockService.subMonthFromAPIDate(startDate))
        addError("Leave: Prev")
    }

    return { leave, nextMonth, previousMonth, loading}
}
