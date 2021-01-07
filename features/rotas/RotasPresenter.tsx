import React, {useEffect, useState} from "react";
import LeaveRepo from "./repo/RotaRepo";
import LeaveAPI from "../../services/api/leaveapi/LeaveAPI";
import {RotasView} from "./RotasView";
import JodaClockService from "../../services/clock/JodaClockService";
import {RotasUI} from "./repo/RotasUI";

export const RotasPresenter: React.FunctionComponent = () => {
    const leaveRepo = new LeaveRepo(new LeaveAPI(), new JodaClockService())
    const [rotas, setRotas] = useState([] as RotasUI[])
    useEffect(() => {

    }, [])

    return (
        <RotasView rotas={rotas}/>
    )
}
