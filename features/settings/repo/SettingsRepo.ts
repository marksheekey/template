import {Callback} from "../../../services/Callback";
import {IClockService} from "../../../services/clock/IClockService";
import {AxiosError} from "axios";
import {ISettings} from "../ISettings";
import {RotaSettings} from "../../../services/api/classes/RotaSettings";

export default class SettingsRepo {
    private static instance: SettingsRepo;

    public constructor(private api: ISettings, private clock: IClockService) {
        this.api = api
        this.clock = clock
    }

    static getInstance(api: ISettings, clock: IClockService): SettingsRepo {
        if (!SettingsRepo.instance) {
            SettingsRepo.instance = new SettingsRepo(api, clock)
        }
        return SettingsRepo.instance
    }

    public async fetchMySettings(callback: Callback) {
        callback.onLoading(true)
        try {
            let settings: RotaSettings = await this.api.getSettings()
            if (settings) {
                callback.onResult(settings)
            } else {
                callback.onResult({})
            }
        } catch (error) {
            if (error && error.response) {
                const axiosError = error as AxiosError<any>
                callback.onError(axiosError.message)
            }
            callback.onError(error.toString())
        } finally {
            callback.onLoading(false)
        }
    }

}
