import React, {useEffect, useState} from "react";
import LeaveRepo from "./repo/LeaveRepo";
import {LeaveUI} from "./repo/LeaveUI";
import {Callback} from "../../services/Callback";
import {LeaveView} from "./LeaveView";
import JodaClockService from "../../services/clock/JodaClockService";
import LeaveAPI from "../../services/api/leaveapi/LeaveAPI";

export const LeavePresenter: React.FunctionComponent = () => {
    const clockService = new JodaClockService()
    const leaveRepo = new LeaveRepo(new LeaveAPI(), clockService)
    const [leave, setLeave] = useState([] as LeaveUI[])
    const [startDate, setStartDate] = useState("2020-01-01")
    useEffect(() => {
        leaveRepo.fetchLeaveForMonth(startDate,new class implements Callback {
            onLoading(loading: Boolean){
                // maybe use app context to show / hide a loader
                // or do something within this component
                console.log("loading",loading)
            }
            onError(message: string){
                // maybe use app context to show / hide an error message
                // or do something within this component
                console.log("error",message)
            }
            onResult(data: LeaveUI[]){
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

    return (
       <LeaveView leave={leave} nextPress={nextMonth} prevPress={previousMonth}/>
    )
}
