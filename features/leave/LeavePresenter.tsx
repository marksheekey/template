import React, {useEffect} from "react";
import LeaveRepo from "./repo/LeaveRepo";
import {LeaveUI} from "./repo/LeaveUI";
import LeaveView from "./LeaveView";
import LeaveAPI from "../../services/api/leaveapi/LeaveAPI";
import {Callback} from "../../services/api/AxiosClient";

export const LeavePresenter: React.FunctionComponent = () => {
    const leaveRepo = new LeaveRepo(new LeaveAPI())
    useEffect(() => {
        leaveRepo.fetchLeave("2020-01-01","2020-01-31",new class implements Callback {
            onLoading(loading: Boolean){
                // maybe use app context to show / hide a loader
                // or do something within this component
            }
            onError(message: string){
                // maybe use app context to show / hide an error message
                // or do something within this component
            }
            onResult(data: LeaveUI[]){
                //pass this data to the view
            }
        })
    }, [])

    return (
       <LeaveView />
    )
}
