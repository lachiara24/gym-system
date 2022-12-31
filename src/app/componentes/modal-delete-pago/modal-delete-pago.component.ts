import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-delete-pago',
  templateUrl: './modal-delete-pago.component.html',
  styleUrls: ['./modal-delete-pago.component.css']
})
export class ModalDeletePagoComponent {
  @Output() onDeletePago: EventEmitter<any> = new EventEmitter();
  @Input() pagoId: any;

  onSubmit(){
    this.onDeletePago.emit(this.pagoId);
  }
}
