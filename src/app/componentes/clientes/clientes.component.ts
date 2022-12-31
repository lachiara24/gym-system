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
  clienteEditar: Cliente = {id: 0, nombre: '', apellido: '', dni: ''};
  ultimoPago: Pago = {fechaPago: new Date(), fechaVenc: new Date()};
  filterBy;

  constructor(
    private pagoService: PagoService,
    private clienteService: ClienteService){}

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

  getLastPago(clienteId): Pago{
    this.pagoService.getLastPago(clienteId).subscribe((pago) => {
      this.ultimoPago = pago;
    });    
    return this.ultimoPago;
  }

  getClientePago(id): Cliente{
    return this.clienteEditar;
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
