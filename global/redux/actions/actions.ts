import {FETCH_SETTINGS, FETCH_SETTINGS_ERROR, FETCH_SETTINGS_OK} from "../types";
import {RotaSettings} from "../../../services/api/classes/RotaSettings";
import {SettingsAction} from "../reducers/settingsReducer";
import SettingsAPI from "../../../services/api/settingsapi/SettingsAPI";

const settingsRepo = SettingsAPI.getInstance()

export const fetchSettings = (): SettingsAction => (
    {
        type: FETCH_SETTINGS,
        payload: { isLoading: true, settings: {}, error: false},
    }
);

export const fetchSettingsOK = (settings: RotaSettings): SettingsAction => (
    {
        type: FETCH_SETTINGS_OK,
        payload: { isLoading: false, settings: settings, error: false},
    }
);

export const fetchSettingsError = (): SettingsAction => (
    {
        type: FETCH_SETTINGS_ERROR,
        payload: { isLoading: false, settings: {}, error: true},
    }
);

export const fetchData = () => (
    (dispatch: Function) => {
        dispatch(fetchSettings());
        return settingsRepo.getSettings()
            .then((settings) => dispatch(fetchSettingsOK(settings)))
            .catch(() => dispatch(fetchSettingsError()));
    }
);
