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
    const documentDefinition = {content: [this.formatoImpresion()]};
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
 

 formatoImpresion(){
   var impresion =[]; 
   
   impresion.push({ text: 'DETALLES DE VISITA',bold: true,fontSize: 20,alignment: 'center',margin: [0, 0, 0, 20]});
   impresion.push({ lineHeight: 3,text: 'Código de visita: ' + this.idvisita});
   

   impresion.push({ lineHeight: 2,text: 'Datos del cliente',color:'#8A93DD'});
   impresion.push(	{canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]});
   impresion.push({ columns:[{  text: ' '},{ text: ' '} ]}) ;
   impresion.push({ text: 'DUI: ' + this.cliente.dui });
   impresion.push({ text: 'Nombre del cliente: ' + this.cliente.nombre });
   impresion.push({ lineHeight: 3,text: 'Mascota: ' + this.cliente.mascota});

   impresion.push({ lineHeight: 2,text: 'Tratamiento',color:'#8A93DD'});
   impresion.push({ canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]});
   impresion.push({ columns:[{  text: ' '},{ text: ' '} ]}) ; 
   impresion.push({ lineHeight: 3,text: this.cliente.visitas[this.idvisita].tratamiento});
   

  
   if(this.cliente.visitas[this.idvisita].listamedicamentos==="---"){
     impresion.push({ lineHeight: 2,text: 'Medicamentos recetados',color:'#8A93DD'});
     impresion.push(	{canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]});
     impresion.push({columns:[{  text: ' '},{ text: ' '} ]}) ;
     impresion.push({ lineHeight: 2,text: 'No aplica'});
     impresion.push({columns:[{  text: ' '},{ text: ' '} ]}) ;   
   }
      
   else{
      impresion.push({ lineHeight: 2,text: 'Medicamentos recetados',color:'#8A93DD'});
      impresion.push(	{canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]});
      impresion.push({columns:[{  text: ' '},{ text: ' '} ]}) ;
     Object.keys(this.cliente.visitas[this.idvisita].medicamentos).forEach(key=> {
      impresion.push({columns:[{ text: this.cliente.visitas[this.idvisita].medicamentos[key].nombre},{ text: '$ '+this.cliente.visitas[this.idvisita].medicamentos[key].precio} ]})
      
     });   
     impresion.push({columns:[{  text: ' '},{ text: ' '} ]}) ;   
   }
  
   impresion.push(	{ canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]});
   impresion.push({columns:[{  text: ' '},{ text: ' '} ]}) ;
   impresion.push({columns:[{   text: 'Costo de consulta'},{ text: '$ '+this.cliente.visitas[this.idvisita].crudo,bold: true} ]}) ;
   impresion.push({columns:[{  lineHeight: 2,text: 'Descuento por visita'},{ text: '$ ('+this.cliente.visitas[this.idvisita].descuento+')' } ]}) ;
   impresion.push({columns:[{  text: '\t\tTOTAL',color:'#00962F',bold: true,fontSize:14},{ text: '$ '+this.cliente.visitas[this.idvisita].costo,color:'#00962F',bold: true,fontSize:14} ]}) ;
  return impresion;
 } 
  
 

}


