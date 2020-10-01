import {Medicamentos} from './medicamentos';

export interface Visitas {
    codigo:       number;
    tratamiento:  string;
    medicamentos: Medicamentos[];
    costo:        number;
}
