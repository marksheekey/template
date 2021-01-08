import {IClockService} from "../../../services/clock/IClockService";
import {ISettings} from "../ISettings";

export default class SettingsRepo {
    public constructor(private api: ISettings, private clock: IClockService) {
        this.api = api
        this.clock = clock
    }

}
