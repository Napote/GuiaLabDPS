import { Injectable } from '@angular/core';

//Libreria para impresion
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

//Modelo
import {Cliente} from '../models/cliente';


@Injectable({
  providedIn: 'root'
})
export class ImpresionService {

  cliente:Cliente = new Cliente();
  idvisita: string;

  constructor() { }

  generatePdf(action = 'open') {
    const documentDefinition = this.getDocumentDefinition();
    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open();    
      break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); 
      break;
      case 'download':     
      pdfMake.createPdf(documentDefinition).download(); 
      break;
      default: pdfMake.createPdf(documentDefinition).open(); 
      break;
    }
 }

 getDocumentDefinition() {
  return {
    content: [
    {
      text: 'DETALLES DE VISITA',
      bold: true,
      fontSize: 20,
      alignment: 'center',
      margin: [0, 0, 0, 20]
    },
    {
    columns: [
      [ { text: 'DUI: ' + this.cliente.dui },
        { text: 'Nombre del cliente: ' + this.cliente.nombre },
        { text: 'Mascota: ' + this.cliente.mascota },
        { text: 'Código de visita: ' + this.idvisita},  
        { text: 'Tratamiento: ' + this.cliente.visitas[this.idvisita].tratamiento},
        { text: 'Costo de consulta: $' + this.cliente.visitas[this.idvisita].costo},
        { text: 'Medicamentos recetados: ' + this.cliente.visitas[this.idvisita].listamedicamentos}
      ] 
    ]
    }],
    styles: {
      name: {
        fontSize: 16,
        bold: true
    }
  }
};
}
 

}


