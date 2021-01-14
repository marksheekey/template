import React, {useState, useCallback, useContext, FunctionComponent, useEffect} from 'react';
import {RotaSettings} from "../services/api/classes/RotaSettings";
import JodaClockService from "../services/clock/JodaClockService";
import {setCallBack} from "../services/setCallBack";
import {useError} from "./ErrorContext";
import SettingsRepo from "../features/settings/repo/SettingsRepo";
import SettingsAPI from "../services/api/settingsapi/SettingsAPI";

type SettingsContextType = {
    settings: RotaSettings,
    expiry: number,
    addSettings: (settings: RotaSettings) => void
    refresh: () => void,
}

export const SettingsContext = React.createContext<SettingsContextType>({
        settings: {} as RotaSettings,
        expiry: 0,
        addSettings: (settings: RotaSettings) => {},
        refresh: () => {}
    }
);

export const SettingsProvider: FunctionComponent = ({children}) => {
    const [settings, setSettings] = useState({} as RotaSettings)
    const [expiry, setExpiry] = useState(0)
    const [refresher, setRefresher] = useState(false)
    const [loading, setLoading] = useState(false)
    const {addError} = useError()
    const clock = JodaClockService.getInstance()
    const settingsRepo = SettingsRepo.getInstance(SettingsAPI.getInstance(), clock)

    const error = (errorString: string) => {
        addError(errorString)
        setExpiry(0)
    }

    useEffect(() => {
        let now = clock.now()
        if(expiry && settings && expiry > now){
            addError("Cached settings")
        }else {
            addError("Fetch Settings")
            setExpiry(now+10000)
            settingsRepo.fetchMySettings(setCallBack(error, setLoading, setSettings))
        }
    }, [refresher])

    const contextValue: SettingsContextType = {
        settings: settings,
        expiry: expiry,
        addSettings: useCallback((rotaSettings: RotaSettings) => {
            let now = JodaClockService.getInstance().now()
            setSettings(rotaSettings)
            setExpiry(now + 10000)
        }, []),
        refresh: () => {setRefresher(!refresher)}
    };


    return (
        <SettingsContext.Provider value={contextValue}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const { settings, addSettings, refresh } = useContext(SettingsContext);
    return { settings, addSettings, refresh };
}
