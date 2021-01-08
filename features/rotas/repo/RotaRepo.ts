import {Callback} from "../../../services/Callback";
import {IClockService} from "../../../services/clock/IClockService";
import {IRotas} from "../IRotas";
import {Leave} from "../../../services/api/classes/Leave";
import {ShiftStartTime} from "../../../services/api/classes/ShiftStartTime";
import {MyRotasUI} from "../MyRotas/MyRotasUI";

export default class RotaRepo {
    public constructor(private api: IRotas, private clock: IClockService) {
        this.api = api
        this.clock = clock
    }

    public async fetchMyRotas(startDate: string, callback: Callback) {
        const endDate = this.clock.finalAPIDateOfMonth(startDate)
        callback.onLoading(true)
        await this.api.getLeave(startDate, endDate).catch((error) => {
            callback.onError(error)
        }).then((leave) => {
                let milliStart = this.clock.apiDateToMillis(startDate)
                let milliEnd = this.clock.apiDateToMillis(endDate)
                console.log("milliStart",milliStart)
                console.log("milliEnd",milliEnd)
                this.api.getShiftStartTimes(milliStart, milliEnd).catch((error) =>{
                    callback.onError(error)
                } ).finally(() => {
                    callback.onLoading(false)
                }).then((shifts) => {
                    let data = createMyRotasUI(leave, shifts)
                    callback.onResult(data)
                })
            }
        ).finally(() => {
            callback.onLoading(false)
        })
    }


}

function createMyRotasUI(leave: Leave[] | void, shifts: ShiftStartTime[]| void): MyRotasUI[] {
    let data: MyRotasUI[] = []
    if(leave){
        for(let oneLeave of leave){
            let ui: MyRotasUI = {
                key: "key"+oneLeave.id,
                item: "Leave",
                start: oneLeave.start_date,
                end: oneLeave.end_date
            }
            data.push(ui)
        }
    }

    if(shifts){
        for(let oneShift of shifts){
            let ui: MyRotasUI = {
                key: "key"+oneShift.id.toString(),
                item: "Shift",
                start: oneShift.start_time.toString(),
                end: oneShift.end_time.toString()
            }
            data.push(ui)
        }
    }

    return data
}

