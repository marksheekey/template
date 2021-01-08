import {Settings} from "../../services/api/classes/Settings";
export interface ISettings {
    getSettings(): Promise<Settings>
}
