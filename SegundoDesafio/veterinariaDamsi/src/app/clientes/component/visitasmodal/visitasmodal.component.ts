import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';   
import { FormsModule,FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms'; 

//Service
import { VisitasService } from '../../../services/visitas.service';


@Component({
  selector: 'app-visitasmodal',
  templateUrl: './visitasmodal.component.html',
  styleUrls: ['./visitasmodal.component.css']
})
export class VisitasmodalComponent implements OnInit {
 

  @Input() cliente;
  @Input() id;
  
  /*Formulario de medicamentos*/
  medicamentosChecklist: FormGroup; 
   
  /*Variables de visita*/ 
  tratamiento:string;
  costoCrudo:number;
  descuento:number;
  costo:number;
  
  constructor(
    private modalServicio: NgbModal, 
    public visitasServicio:VisitasService,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder
  ) { 
      this.medicamentosChecklist=this.fb.group({
      checkArray:this.fb.array([])
    })
  }


  listaMedicamentos = [
    { id: 1, nombre: 'Bravecto 1000 mg', precio:34.99,checked:false },
    { id: 2, nombre: 'Collar ECTHOL razas pequeñas',precio:14.50,checked:false },
    { id: 3, nombre: 'Gel antiplaca', precio:11.00,checked:false },
    { id: 4, nombre: 'NexGard Desparasitante',  precio:15.99,checked:false },
    { id: 5, nombre: 'Total Full Desparasitante', precio:14.85,checked:false },
    { id: 6, nombre: 'Collar antipulgas para gatos',  precio:11.85,checked:false}
  ];

  

  motivoCierre=''; 

  ngOnInit(): void {       
    this.cliente.numerovisitas= this.cliente.numerovisitas+1;
    //Aplica descuento segun el numero de visitas del cliente seleccionado
    this.costoCrudo=5;  
    this.descuento=0;
    if(this.cliente.numerovisitas >= 2 && this.cliente.numerovisitas < 5) 
      this.descuento=0.05; 
    else if(this.cliente.numerovisitas >= 5)    
      this.descuento=0.08; 
    

    this.costo=5;  
    this.costo= +(this.costoCrudo-(this.descuento*this.costoCrudo)).toFixed(2); 
    
  }
   

  open(content) {
    this.modalServicio.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => 
    {
      this.motivoCierre = `Closed with: ${result}`;
    }, (reason) => 
    {
      this.motivoCierre = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  //Esta funcion controla el costo de la consulta dependiendo de los checkbox que se seleccionen
  //Si se selecciona un checkbox el costo del item se suma, de lo contrario se resta
  //Esta funcion tambien llama al servicio de visitas para quitar o meter un producto segun sea necesario

  calcularCosto(producto, values:any){   
      const checkArray: FormArray = this.medicamentosChecklist.get('checkArray') as FormArray;
      if (values.target.checked) {
        checkArray.push(new FormControl(values.target.value)); 
        this.costoCrudo=this.costoCrudo+producto.precio;

        this.visitasServicio.medicamentosTiket.push(producto);

      } else {
        this.costoCrudo=this.costoCrudo-producto.precio;

        this.visitasServicio.quitarMedicamento(producto);

        let i: number = 0;
        checkArray.controls.forEach((item: FormControl) => {
          if (item.value == values.target.value) {
            checkArray.removeAt(i);
            return;
          }
          i++;
        });
      } 

      this.costoCrudo=+(this.costoCrudo).toFixed(2); 
      this.costo= +(this.costoCrudo-(this.descuento*this.costoCrudo)).toFixed(2); 
  }

    guardarVisita(){             
      this.visitasServicio.recibirCosto(this.costo);
      this.visitasServicio.recibirTratamiento(this.tratamiento);
      this.visitasServicio.crearVisita(this.id,this.cliente);
    }



}
