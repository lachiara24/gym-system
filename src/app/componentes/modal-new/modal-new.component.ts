import { Component, Output, EventEmitter } from '@angular/core';
import { Cliente } from 'src/app/Cliente';

@Component({
  selector: 'app-modal-new',
  templateUrl: './modal-new.component.html',
  styleUrls: ['./modal-new.component.css']
})
export class ModalNewComponent {
  @Output() onAddCliente: EventEmitter<Cliente> = new EventEmitter();
  nombre: string;
  apellido: string;
  dni: string;
  dire: string;
  obra: string;

  onSubmit(){
    const {nombre, apellido, dni, dire, obra} = this
    const newCliente = {nombre, apellido, dni, dire, obra}
    this.onAddCliente.emit(newCliente);
  }

  
}
