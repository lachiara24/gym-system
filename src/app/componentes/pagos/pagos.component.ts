import { Component, OnInit, Input } from '@angular/core';
import { PagoService } from 'src/app/servicios/pago.service';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { Pago } from 'src/app/Pago';
import { Cliente } from 'src/app/Cliente';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {
  pagos: Pago[] = [];
  pagoEditar: Pago = {id: 0, fechaPago: new Date(), fechaVenc: new Date()};
  ultimoPago: Pago;
  clienteId;
  cliente: Cliente = {id: 0, nombre: '', apellido: '', dni: ''};

  constructor(
    private clienteService: ClienteService,
    private rutaActiva: ActivatedRoute,
    private pagoService: PagoService){}

  ngOnInit() {
    this.clienteId = this.rutaActiva.snapshot.params['idcliente'];
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.clienteId = params['idcliente'];
      }
    );
    this.pagoService.getPagos(this.clienteId).subscribe((pagos) => {
      this.pagos = pagos
    });
    this.clienteService.getCliente(this.clienteId).subscribe((cliente) => {
      this.cliente = cliente
    });
    this.pagoService.getLastPago(this.clienteId).subscribe((pago) => {
      this.ultimoPago = pago;
    });    
  }

  getPago(id){
    this.pagoService.getPago(this.clienteId,id).subscribe((pago) => {
      this.pagoEditar = pago;
    });
  }

  addPago(pago: Pago){
    this.pagoService.addPago(this.clienteId, pago).subscribe((pago) => {
      this.pagos.push(pago)
    });
  }

  editPago(pago: Pago){
    this.pagoService.updatePago(this.clienteId, pago).subscribe();
  }

  deletePago(id){
    this.pagoService.deletePago(this.clienteId, id)
      .subscribe(
        () => (
          this.pagos = this.pagos.filter( t => {
            return t.id !== id
          })
      ))
  }
}
