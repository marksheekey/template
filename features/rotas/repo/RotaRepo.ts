import {Callback} from "../../../services/Callback";
import {IClockService} from "../../../services/clock/IClockService";
import {IRotas} from "../IRotas";
import {Leave} from "../../../services/api/classes/Leave";
import {ShiftStartTime} from "../../../services/api/classes/ShiftStartTime";
import {MyRotasUI} from "../myrotas/MyRotasUI";
import {AxiosError} from "axios";

export default class RotaRepo {
    public constructor(private api: IRotas, private clock: IClockService) {
        this.api = api
        this.clock = clock
    }

    public async fetchMyRotas(startDate: string, callback: Callback) {
        callback.onLoading(true)
        const endDate = this.clock.finalAPIDateOfMonth(startDate)
        try {
            let leave = await this.api.getLeave(startDate, endDate)
            let shifts: ShiftStartTime[]
            if (leave) {
                let milliStart = this.clock.apiDateToMillis(startDate)
                let milliEnd = this.clock.apiDateToMillis(endDate)
                shifts = await this.api.getShiftStartTimes(milliStart, milliEnd)
                if(shifts) {
                    callback.onResult(createMyRotasUI(leave, shifts))
                }else{
                    callback.onResult([])
                }
            }
        } catch (error) {
            if (error && error.response) {
                const axiosError = error as AxiosError<any>
                callback.onError(axiosError.message)
            }
            callback.onError("An error when fetching Rotas")
        } finally {
            callback.onLoading(false)
        }
    }

}

function createMyRotasUI(leave: Leave[] , shifts: ShiftStartTime[]): MyRotasUI[] {
    let data: MyRotasUI[] = []
    if (leave) {
        for (let oneLeave of leave) {
            let ui: MyRotasUI = {
                key: "key" + oneLeave.id,
                item: "Leave",
                start: oneLeave.start_date,
                end: oneLeave.end_date
            }
            data.push(ui)
        }
    }

    if (shifts) {
        for (let oneShift of shifts) {
            let ui: MyRotasUI = {
                key: "key" + oneShift.id.toString(),
                item: "Shift",
                start: oneShift.start_time.toString(),
                end: oneShift.end_time.toString()
            }
            data.push(ui)
        }
    }

    return data
}

