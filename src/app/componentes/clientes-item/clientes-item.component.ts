import { Component, Input } from '@angular/core';
import { Cliente } from 'src/app/Cliente';
import { Pago } from 'src/app/Pago';

@Component({
  selector: 'app-clientes-item',
  templateUrl: './clientes-item.component.html',
  styleUrls: ['./clientes-item.component.css']
})
export class ClientesItemComponent {
  @Input() cliente: Cliente;
  @Input() ultimoPago: any;

  fechaActual: Date = new Date(new Date().toDateString());
  

  clienteActivo(fecha): boolean{
    fecha = new Date(fecha);
    fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset());
    if (this.fechaActual.getTime() === new Date(fecha).getTime()){
      return true;
    }else if(this.fechaActual.getTime() < new Date(fecha).getTime()){
      return true;
    }else{
      return false;
    }
  }

  quedanDias(fecha): number{
    fecha = new Date(fecha);
    fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset());
    return Math.round(Math.abs(this.fechaActual.getTime() - fecha.getTime())  / (1000 * 3600 * 24)); 
  }
  
}
