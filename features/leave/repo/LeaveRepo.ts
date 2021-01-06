import LeaveAPI from "../../../services/api/leaveapi/LeaveAPI";
import {LeaveUI} from "./LeaveUI";
import {Callback} from "../../../services/Callback";

export default class LeaveRepo {
    public constructor(private api: LeaveAPI) {
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
