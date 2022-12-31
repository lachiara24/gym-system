import { Component, OnChanges, EventEmitter, Output, Input } from '@angular/core';
import { Pago } from 'src/app/Pago';

@Component({
  selector: 'app-modal-edit-pago',
  templateUrl: './modal-edit-pago.component.html',
  styleUrls: ['./modal-edit-pago.component.css']
})
export class ModalEditPagoComponent implements OnChanges{
  @Output() onEditPago: EventEmitter<Pago> = new EventEmitter();
  @Input() pago: Pago;
  fechaPago;
  fechaVenc;
  id: any;

  ngOnChanges(){
    this.id = this.pago.id;
    this.fechaPago = this.pago.fechaPago;
    this.fechaVenc = this.pago.fechaVenc;
  }  

  onSubmit(){
    const {id, fechaPago, fechaVenc} = this
    const editedPago = {id, fechaPago, fechaVenc}
    this.onEditPago.emit(editedPago);
  }
}
