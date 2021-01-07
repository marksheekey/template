import {Callback} from "../../../services/Callback";
import {IClockService} from "../../../services/clock/IClockService";
import {IRotas} from "../IRotas";

export default class RotaRepo {
    public constructor(private api: IRotas, private clock: IClockService) {
        this.api = api
        this.clock = clock
    }

    public async fetchRotas(startDate: string, endDate: string, callback: Callback) {
        callback.onLoading(true)
    }
}
