import { Component, Output, EventEmitter, Input, OnChanges} from '@angular/core';
import { Cliente } from 'src/app/Cliente';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.css']
})
export class ModalEditComponent implements OnChanges {

  @Output() onEditCliente: EventEmitter<Cliente> = new EventEmitter();
  @Input() cliente: Cliente;
  nombre: string;
  apellido: string;
  dni: string;
  dire: string;
  obra: string;
  id: any;

  ngOnChanges(){
    this.id = this.cliente.id;
    this.apellido = this.cliente.apellido;
    this.dni = this.cliente.dni;
    this.nombre = this.cliente.nombre;
  }  

  onSubmit(){
    const {id, nombre, apellido, dni, dire, obra} = this
    const editedCliente = {id, nombre, apellido, dni, dire, obra}
    this.onEditCliente.emit(editedCliente);
  }

}
