import {Visitas} from './visitas';

export class Cliente {  
    id:          string;
    dui:           string;
    nombre:        string;
    mascota:       string;
    numerovisitas: number;
    visitas:       Visitas[];
}
