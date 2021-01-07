import AxiosClient from "../AxiosClient";
import {IRotas} from "../../../features/rotas/IRotas";
import {Rotas} from "../classes/Rotas";

export default class RotasAPI extends AxiosClient implements IRotas{
    public getRotas(startDate:string, endDate:string): Promise<Rotas[]>{
        return this.instance.get<Rotas[],Rotas[]>('leave?expand[]=type&include_denied=false', {params: {start: startDate, end: endDate}})
    }
}
