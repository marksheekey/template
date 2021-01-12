import AxiosClient from "../AxiosClient";
import {RotaSettings} from "../classes/RotaSettings";
import {ISettings} from "../../../features/settings/ISettings";

export default class SettingsAPI extends AxiosClient implements ISettings{

    private static instance: SettingsAPI
    private constructor() {
        super();
    }

    static getInstance(): SettingsAPI {
        if (!SettingsAPI.instance) {
            SettingsAPI.instance = new SettingsAPI();
        }
        return SettingsAPI.instance;
    }

    public getSettings(): Promise<RotaSettings>{
        return this.instance.get<RotaSettings,RotaSettings>('settings?only_values=true', { })
    }
}
