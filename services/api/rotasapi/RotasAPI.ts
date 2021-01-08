import AxiosClient from "../AxiosClient";
import {IRotas} from "../../../features/rotas/IRotas";
import {Leave} from "../classes/Leave";
import {ShiftStartTime} from "../classes/ShiftStartTime";

export default class RotasAPI extends AxiosClient implements IRotas{
    public getLeave(startDate:string, endDate:string): Promise<Leave[]>{
        return this.instance.get<Leave[],Leave[]>('leave?expand[]=type&include_denied=false', {params: {start: startDate, end: endDate}})
    }

    public getShiftStartTimes(startDate:string, endDate:string): Promise<ShiftStartTime[]>{
        return this.instance.get<ShiftStartTime[],ShiftStartTime[]>('shifts', {params: {start: startDate, end: endDate}})
    }
}
