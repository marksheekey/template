import {Leave} from "../../../services/api/classes/Leave"
import AxiosClient from "../AxiosClient";

export default class LeaveAPI extends AxiosClient {

   public getLeave(startDate:string, endDate:string): Promise<Leave[]>{
       return this.instance.get<Leave[],Leave[]>('leave?expand[]=type&include_denied=false', {params: {start: startDate, end: endDate}})
   }
}
