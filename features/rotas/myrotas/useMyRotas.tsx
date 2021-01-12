import JodaClockService from "../../../services/clock/JodaClockService";
import {useEffect, useState} from "react";
import RotasAPI from "../../../services/api/rotasapi/RotasAPI";
import {MyRotasUI} from "./MyRotasUI";
import RotaRepo from "../repo/RotaRepo";
import {setCallBack} from "../../../services/setCallBack";
import {useError} from "../../../global/GlobalContext";

export const useMyRotas = () => {
    const clockService = new JodaClockService()
    const rotasRepo = new RotaRepo(new RotasAPI(), clockService)
    const [rotas, setRotas] = useState([] as MyRotasUI[])
    const [startDate, setStartDate] = useState("2020-01-01")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const { addError } = useError();

    useEffect(() => {
          rotasRepo.fetchMyRotas(startDate, setCallBack(setError, setLoading, setRotas)).then()
    }, [startDate])

    const nextMonth = () => {
        setStartDate(clockService.addMonthToAPIDate(startDate))
        addError("next")
    }

    const previousMonth = () => {
        setStartDate(clockService.subMonthFromAPIDate(startDate))
        addError("prev")
    }

    return { rotas, nextMonth, previousMonth, error, loading}
}
// just to demo a test
export function sum(a: number, b: number) {
    return a + b;
}
