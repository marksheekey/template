import JodaClockService from "../../../services/clock/JodaClockService";
import {useEffect, useState} from "react";
import {Callback} from "../../../services/Callback";
import RotasAPI from "../../../services/api/rotasapi/RotasAPI";
import {MyRotasUI} from "./MyRotasUI";
import RotaRepo from "../repo/RotaRepo";

export const useMyRotas = () => {
    const clockService = new JodaClockService()
    const rotasRepo = new RotaRepo(new RotasAPI(), clockService)
    const [rotas, setRotas] = useState([] as MyRotasUI[])
    const [startDate, setStartDate] = useState("2020-01-01")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    let callback: Callback = {
        onError(errorCallback: Error): void {setError(errorCallback.message)},
        onLoading(loadingCallback: boolean): void { setLoading(loadingCallback)},
        onResult(data: any): void { setRotas(data)}
    }

    useEffect(() => {
        rotasRepo.fetchMyRotas(startDate, callback)
    }, [startDate])

    const nextMonth = () => {
        setStartDate(clockService.addMonthToAPIDate(startDate))
    }

    const previousMonth = () => {
        setStartDate(clockService.subMonthFromAPIDate(startDate))
    }

    return { rotas, nextMonth, previousMonth, error, loading}
}
