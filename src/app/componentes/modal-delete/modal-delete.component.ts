import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css']
})
export class ModalDeleteComponent {
  @Output() onDeleteCliente: EventEmitter<any> = new EventEmitter();
  @Input() clienteId: any;

  onSubmit(){
    this.onDeleteCliente.emit(this.clienteId);
  }
}
