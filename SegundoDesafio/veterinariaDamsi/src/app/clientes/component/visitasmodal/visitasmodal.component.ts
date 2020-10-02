import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';   
import { FormsModule,FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms'; 

@Component({
  selector: 'app-visitasmodal',
  templateUrl: './visitasmodal.component.html',
  styleUrls: ['./visitasmodal.component.css']
})
export class VisitasmodalComponent implements OnInit {

  @Input() cliente;

  
  /*Formulario de medicamentos*/
  medicamentosChecklist: FormGroup; 
 
  /*Variables de visita*/
  medicamentos:string;
  tratamiento:string;
  costoCrudo:number;
  descuento:number;
  costo:number;
  
  constructor(
    private modalServicio: NgbModal, 
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
    { id: 4, nombre: 'NexGard Desparasitante',precio:15.99,checked:false },
    { id: 5, nombre: 'Total Full Desparasitante',precio:14.85,checked:false },
    { id: 6, nombre: 'Collar antipulgas para gatos',precio:11.85,checked:false}
  ];

  


  motivoCierre='';

  nombre='';
  dui='';
  mascota='';
  numerovisitas='';

  ngOnInit(): void {   
    //Aplica descuento segun el numero de visitas del cliente seleccionado
    if(this.cliente.numerovisitas>=2 && this.cliente.numerovisitas <4) 
      this.descuento=0.05; 
    else if(this.cliente.numerovisitas>=4)    
      this.descuento=0.1; 

    this.costoCrudo=5;
    this.descuento=0;
    this.costo=5;     
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
  calcularCosto(precio:number, values:any){   
      const checkArray: FormArray = this.medicamentosChecklist.get('checkArray') as FormArray;
      if (values.target.checked) {
        checkArray.push(new FormControl(values.target.value));
        this.costoCrudo=this.costoCrudo+precio;
      } else {
        this.costoCrudo=this.costoCrudo-precio;
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
      console.log(this.medicamentosChecklist.value)
  }




}
