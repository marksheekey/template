import {RotaSettings} from "../../../services/api/classes/RotaSettings";
import {FETCH_SETTINGS, FETCH_SETTINGS_ERROR, FETCH_SETTINGS_OK} from '../types'

export type SettingsState = {
    settings: RotaSettings,
    isLoading: boolean,
    error: boolean
}

export type SettingsAction = {
    type: string,
    payload: SettingsState
}

const initalState: SettingsState = {
    settings: {},
    isLoading: false,
    error: false
}

export const settingsReducer = (state: SettingsState = initalState, action: SettingsAction): SettingsState => {
    switch (action.type) {
        case FETCH_SETTINGS_OK: {
            return {
                isLoading: false,
                error: false,
                settings: action.payload.settings
            }
        }
        case FETCH_SETTINGS: {
            return {
                isLoading: true,
                error: false,
                settings: {}
            }
        }
        case FETCH_SETTINGS_ERROR: {
            return {
                ...state,
                isLoading: false,
                error: true,
            }
        }
        default: {
            return state;
        }
    }
}
