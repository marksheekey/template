import JodaClockService from "../../services/clock/JodaClockService";
import {useEffect, useState} from "react";
import SettingsRepo from "./repo/SettingsRepo";
import SettingsAPI from "../../services/api/settingsapi/SettingsAPI";
import {useSettings} from "../../global/SettingsContext";
import {useError} from "../../global/ErrorContext";
import {setCallBack} from "../../services/setCallBack";

export const useMySettings = () => {
    const settingsRepo = SettingsRepo.getInstance(SettingsAPI.getInstance(), JodaClockService.getInstance())
    const [refresher, setRefresher] = useState(false)
    const [loading, setLoading] = useState(false)
    const {settings, addSettings, expiry} = useSettings()
    const { addError } = useError();

    const refresh = () => {
        setRefresher(!refresher)
    }

    useEffect(() => {
        let now = JodaClockService.getInstance().now()
        if(expiry && settings && expiry > now){
            addSettings!(settings)
            addError("Cached settings")
        }else {
            addError("Fetch Settings")
            settingsRepo.fetchMySettings(setCallBack(addError, setLoading, addSettings!))
        }
    }, [refresher])

    return { settings, loading, refresh}
}
