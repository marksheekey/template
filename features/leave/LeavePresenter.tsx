import React, {useEffect} from "react";
import {LeaveView} from "./LeaveView";
import {container} from "tsyringe";
import LeaveRepo from "./repo/LeaveRepo";
import {Callback} from "../../services/api/Client";
import {LeaveUI} from "./repo/LeaveUI";

export const LeavePresenter: React.FunctionComponent = () => {
    const leaveApi = container.resolve(LeaveRepo)
    useEffect(() => {
        leaveApi.fetchLeave("2020-01-01","2020-01-31",new class implements Callback {
            onLoading(loading: Boolean){

            }
            onError(message: string){

            }
            onResult(data: LeaveUI[]){

            }
        })
    }, [])

    return (
       <LeaveView />
    )
}
