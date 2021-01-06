import {LeaveUI} from "./LeaveUI";
import {Callback} from "../../../services/Callback";
import {Leave} from "../../../services/api/classes/Leave";

export default class LeaveRepo {
    public constructor(private api: ILeave) {
        this.api = api
    }
    public async fetchLeave(startDate: string, endDate: string, callback: Callback) {
        let leaveUI: LeaveUI[] = []
        callback.onLoading(true)
        await this.api.getLeave(startDate, endDate).catch((error) => {
            callback.onError(error)
        }).then((data) => {
                if (data) {
                    leaveUI = data.map(leaveUI)
                    for (let leave of data) {
                        let item:LeaveUI = {
                            key : "key"+leave.id,
                            start: leave.start_date,
                            end: leave.end_date
                        }
                        leaveUI.push(item)
                        console.log("leave:",leave.id)
                    }
                }
                callback.onResult(leaveUI)
            }
        ).finally( () => {
            callback.onLoading(false)
        })
    }
}

function createLeaveUI(leave: Leave) : LeaveUI {
    return {
        key : "key"+leave.id,
        start: leave.start_date,
        end: leave.end_date
    }
}

export interface ILeave{
    getLeave(startDate:string, endDate:string): Promise<Leave[]>
}
