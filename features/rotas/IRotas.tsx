import {Rotas} from "../../services/api/classes/Rotas";

export interface IRotas {
    getRotas(startDate: string, endDate: string): Promise<Rotas[]>
}
