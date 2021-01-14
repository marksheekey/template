import JodaClockService from "../../../services/clock/JodaClockService";
import {useEffect, useState} from "react";
import RotasAPI from "../../../services/api/rotasapi/RotasAPI";
import {MyRotasUI} from "./MyRotasUI";
import RotaRepo from "../repo/RotaRepo";
import {setCallBack} from "../../../services/setCallBack";
import {useError} from "../../../global/ErrorContext";
import {useLoading} from "../../../global/LoadingContext";

export const useMyRotas = () => {
    const clockService = JodaClockService.getInstance()
    const rotasRepo = new RotaRepo(new RotasAPI(), clockService)
    const [rotas, setRotas] = useState([] as MyRotasUI[])
    const [startDate, setStartDate] = useState("2020-01-01")
    const {setIsLoading} = useLoading()
    const { addError } = useError();

    useEffect(() => {
          rotasRepo.fetchMyRotas(startDate, setCallBack(addError, setIsLoading, setRotas)).then()
    }, [startDate])

    const nextMonth = () => {
        setStartDate(clockService.addMonthToAPIDate(startDate))
        addError("My Rotas:next")
    }

    const previousMonth = () => {
        setStartDate(clockService.subMonthFromAPIDate(startDate))
        addError("MyRotas: prev")
    }

    return { rotas, nextMonth, previousMonth}
}
// just to demo a test
export function sum(a: number, b: number) {
    return a + b;
}
