import { Component, EventEmitter, Output } from '@angular/core';
import { Pago } from 'src/app/Pago';

@Component({
  selector: 'app-modal-new-pago',
  templateUrl: './modal-new-pago.component.html',
  styleUrls: ['./modal-new-pago.component.css']
})
export class ModalNewPagoComponent {
  fechaPago = new Date();
  fechaVenc = new Date();
  @Output() onAddPago: EventEmitter<Pago> = new EventEmitter();

  constructor(){}

  onSubmit(){
    const {fechaPago, fechaVenc} = this
    const newPago = {fechaPago, fechaVenc}
    this.onAddPago.emit(newPago);
  }

}
