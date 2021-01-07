import {LeaveUI} from "./LeaveUI";
import {Callback} from "../../../services/Callback";
import {Leave} from "../../../services/api/classes/Leave";
import {IClockService} from "../../../services/clock/IClockService";

export default class LeaveRepo {
    public constructor(private api: ILeave, private clock: IClockService) {
        this.api = api
        this.clock = clock
    }

    public async fetchLeave(startDate: string, endDate: string, callback: Callback) {
        callback.onLoading(true)
        await this.api.getLeave(startDate, endDate).catch((error) => {
            callback.onError(error)
        }).then((data) => {
                if (data) {
                    callback.onResult(data.map(item => {
                        return createLeaveUI(item, this.clock)
                    }))
                } else {
                    callback.onResult([])
                }
            }
        ).finally(() => {
            callback.onLoading(false)
        })
    }
}

function createLeaveUI(leave: Leave, clock: IClockService): LeaveUI {
    return {
        key: "key" + leave.id,
        start: clock.apiDateToPrettyDate(leave.start_date),
        end: leave.end_date
    }
}


export interface ILeave {
    getLeave(startDate: string, endDate: string): Promise<Leave[]>
}
