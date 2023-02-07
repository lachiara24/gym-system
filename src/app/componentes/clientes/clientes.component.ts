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
  clienteEditar: Cliente = {id: 0, nombre: '', apellido: '', dni: '', dire: '', obra: ''};
  filterBy : any;
  clientesSeleccionados: Cliente[] = [];
  ultimoPago: any;
  fechaActual: Date = new Date(new Date().toDateString());
  active = 0;

  clientesFire: Cliente[] = [];

  tableContent: any[] = [];


  constructor(
    private pagoService: PagoService,
    private clienteService: ClienteService){ }

  ngOnInit() {
    for (let i = 0; i < 100; i++) {
      this.tableContent.push({
        id: i + 1,
        name: `content-${i + 1}`,
      });
    }
    this.clienteService.getClientes().subscribe((clientes) => {
      this.clientes = clientes;
      
      this.clientes.forEach((c) => {
        this.pagoService.getLastPago(c.id).subscribe((pago) => {
          if(pago){
            c.pago = pago.fechaPago;
            c.venc = pago.fechaVenc;
          }
        });  
      }); 
    });       
  }

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
  
  

  checkAllCheckBox(event){
    this.clientes.forEach((c) => this.clientesSeleccionados.push(c));
  }

  checkbox(event){
    if ( event.target.checked ) {
      console.log(event.target.value);
      let clienteSeleccionado = this.clientes.find( item => item.id == event.target.value);
      if (clienteSeleccionado !== undefined){
        this.clientesSeleccionados.push(clienteSeleccionado);
      }      
    }
  }

  imprimir(){
    console.log(this.clientesSeleccionados);
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
      this.clientes = this.clientes || [];
      this.clientes.push(cliente);
    });
    
  }

  editCliente(cliente: Cliente){
    this.clienteService.updateCliente(cliente).subscribe();
    let index = this.clientes.findIndex(el => el.id == cliente.id);
    this.clientes[index] = cliente;
    this.clientes.forEach((c) => {
      this.pagoService.getLastPago(c.id).subscribe((pago) => {
        if(pago){
          c.pago = pago.fechaPago;
          c.venc = pago.fechaVenc;
        }
      });  
    }); 
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

  cantClientesActivos(): number{
    let cont = 0;
    this.clientes.forEach((c) => {
      if(this.clienteActivo(c.venc)){
        cont ++;
      }
    })
    return cont;
  }
}
