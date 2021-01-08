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

    useEffect(() => {
        rotasRepo.fetchMyRotas(startDate, new class implements Callback {
            onLoading(loadingCallback: boolean) {
                setLoading(loadingCallback)
            }
            onError(err: Error) {
                console.log(err.message)
                setError(err.message)
            }
            onResult(data: MyRotasUI[]) {
                setRotas(data)
            }
        })
    }, [startDate])

    const nextMonth = () => {
        setStartDate(clockService.addMonthToAPIDate(startDate))
    }

    const previousMonth = () => {
        setStartDate(clockService.subMonthFromAPIDate(startDate))
    }

    return { rotas, nextMonth, previousMonth, error, loading}
}
