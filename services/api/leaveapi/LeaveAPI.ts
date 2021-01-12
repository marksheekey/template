import {Leave} from "../../../services/api/classes/Leave"
import AxiosClient from "../AxiosClient";
import {ILeave} from "../../../features/leave/ILeave";

export default class LeaveAPI extends AxiosClient implements ILeave{
    private static instance: LeaveAPI
    private constructor() {
        super();
    }

    static getInstance(): LeaveAPI {
        if (!LeaveAPI.instance) {
            LeaveAPI.instance = new LeaveAPI();
        }

        return LeaveAPI.instance;
    }

    public getLeave(startDate:string, endDate:string): Promise<Leave[]>{
        return this.instance.get<Leave[],Leave[]>('leave?expand[]=type&include_denied=false', {params: {start: startDate, end: endDate}})
    }
}
