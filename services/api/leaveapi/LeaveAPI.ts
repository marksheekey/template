import {Leave} from "../../../services/api/classes/Leave"
import Client from "../Client";
import {inject, injectable} from "tsyringe";

@injectable()
export default class LeaveAPI {

    public constructor(@inject("Client") private client?: Client) {
       this.client = client
    }

   public getLeave(startDate:string, endDate:string): Promise<Leave[]>{
       return this.client!.instance.get<Leave[],Leave[]>('leave?expand[]=type&include_denied=false', {params: {start: startDate, end: endDate}})
   }
}
