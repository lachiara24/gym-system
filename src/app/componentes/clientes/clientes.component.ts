import { Component, OnInit} from '@angular/core';
import { Cliente } from 'src/app/Cliente';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { PagoService } from 'src/app/servicios/pago.service';
import { Pago } from 'src/app/Pago';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit{
  clientes: Cliente[] = [];
  pagos: Pago[] = [];
  clienteEditar: Cliente = {nombre: '', apellido: '', dni: ''};
  

  constructor(
    private clienteService: ClienteService,
    private pagoService: PagoService){}

  ngOnInit() {
    this.clienteService.getClientes().subscribe((clientes) => {
      this.clientes = clientes
    });
  }

  getCliente(id){
    this.clienteService.getCliente(id).subscribe((cliente) => {
      this.clienteEditar = cliente;
    });
  }

  addCliente(cliente: Cliente){
    this.clienteService.addCliente(cliente).subscribe((cliente) => {
      this.clientes.push(cliente)
    });
  }

  editCliente(cliente: Cliente){
    this.clienteService.updateCliente(cliente).subscribe();
  }

  deleteCliente(id){
    this.clienteService.deleteCliente(id)
      .subscribe(
        () => (
          this.clientes = this.clientes.filter( t => {
            return t.id !== id
          })
      ))
  }
}
