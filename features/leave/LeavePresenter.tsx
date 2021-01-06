import React, {useEffect} from "react";
import LeaveRepo from "./repo/LeaveRepo";
import {LeaveUI} from "./repo/LeaveUI";
import LeaveView from "./LeaveView";
import LeaveAPI from "../../services/api/leaveapi/LeaveAPI";
import {Callback} from "../../services/Callback";

export const LeavePresenter: React.FunctionComponent = () => {
    const leaveRepo = new LeaveRepo(new LeaveAPI())
    useEffect(() => {
        leaveRepo.fetchLeave("2020-01-01","2020-01-31",new class implements Callback {
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
            }
        })
    }, [])

    return (
       <LeaveView />
    )
}
