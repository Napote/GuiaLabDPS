import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap'; 

@Component({
  selector: 'app-visitasmodal',
  templateUrl: './visitasmodal.component.html',
  styleUrls: ['./visitasmodal.component.css']
})
export class VisitasmodalComponent implements OnInit {

  constructor(private modalServicio: NgbModal, public activeModal: NgbActiveModal) { }

  motivoCierre='';
  ngOnInit(): void {
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

}
