import React, {useState, useCallback, ReactNode, useContext, ReactChildren, FunctionComponent} from 'react';
import {RotaSettings} from "../services/api/classes/RotaSettings";
import JodaClockService from "../services/clock/JodaClockService";

type SettingsContextType = {
    settings: RotaSettings,
    expiry: number,
    addSettings: (settings: RotaSettings) => void,
    addExpiry: (millis: number) => void
}

export const SettingsContext = React.createContext<Partial<SettingsContextType>>({
        expiry: 0,
        addSettings: (settings: RotaSettings) => {},
        addExpiry: (millis: number) => {}
    }
);

export const SettingsProvider: FunctionComponent = ({children}) => {
    const [settings, setSettings] = useState({} as RotaSettings)
    const [expiry, setExpiry] = useState(0)

    const contextValue: SettingsContextType = {
        settings: settings,
        expiry: expiry,
        addSettings: useCallback((rotaSettings: RotaSettings) => {
            let now = JodaClockService.getInstance().now()
            setSettings(rotaSettings)
            setExpiry!(now + 10000)
        }, []),
        addExpiry: useCallback((rotaExpiry: number) => setExpiry(rotaExpiry), []),
    };

    return (
        <SettingsContext.Provider value={contextValue}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const { settings, addSettings, expiry } = useContext(SettingsContext);
    return { settings, addSettings, expiry };
}
