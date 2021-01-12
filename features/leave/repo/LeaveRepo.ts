import {LeaveUI} from "./LeaveUI";
import {Callback} from "../../../services/Callback";
import {Leave} from "../../../services/api/classes/Leave";
import {IClockService} from "../../../services/clock/IClockService";
import {ILeave} from "../ILeave";
import LeaveAPI from "../../../services/api/leaveapi/LeaveAPI";

export default class LeaveRepo {
    private static instance: LeaveRepo;
    public constructor(private api: ILeave, private clock: IClockService) {
        this.api = api
        this.clock = clock
    }

    static getInstance(api: ILeave, clock: IClockService): LeaveRepo {
        if (!LeaveRepo.instance) {
            LeaveRepo.instance = new LeaveRepo(api,clock)
        }

        return LeaveRepo.instance
    }

    public async fetchLeaveForMonth(startDate: string, callback: Callback) {
        const endDate = this.clock.finalAPIDateOfMonth(startDate)
        console.log("start:",startDate)
        console.log("end:",endDate)
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
