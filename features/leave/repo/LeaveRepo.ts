import LeaveAPI from "../../../services/api/leaveapi/LeaveAPI";
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
                    for (let leave of data) {
                        console.log("leave:",leave.start_date)
                    }
                }
                callback.onResult(leaveUI)
            }
        ).finally( () => {
            callback.onLoading(false)
        })
    }
}

export interface ILeave{
    getLeave(startDate:string, endDate:string): Promise<Leave[]>
}
