import AxiosClient from "../AxiosClient";
import {Settings} from "../classes/Settings";
import {ISettings} from "../../../features/settings/ISettings";

export default class SettingsAPI extends AxiosClient implements ISettings{
    public getSettings(): Promise<Settings>{
        return this.instance.get<Settings,Settings>('settings?only_values=true', { })
    }
}
