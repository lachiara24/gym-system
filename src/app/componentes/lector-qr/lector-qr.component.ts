import { Component } from '@angular/core';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { Cliente } from 'src/app/Cliente';
import { PagoService } from 'src/app/servicios/pago.service';
import { Pago } from 'src/app/Pago';

@Component({
  selector: 'app-lector-qr',
  templateUrl: './lector-qr.component.html',
  styleUrls: ['./lector-qr.component.css']
})
export class LectorQRComponent {
  public cameras:MediaDeviceInfo[]=[];
  public myDevice!: MediaDeviceInfo;
  public scannerEnabled=false;
  // Resultados como lista
  public results:string[]=[];
  clientes: Cliente[] = [];
  clienteEscaneado: Cliente;
  ultimoPago: Pago = {fechaPago: new Date(), fechaVenc: new Date()};

  constructor(
    private clienteService:ClienteService,
    private pagoService:PagoService
  ) {
  }

  camerasFoundHandler(cameras: MediaDeviceInfo[]){
    this.cameras=cameras;
    this.selectCamera(this.cameras[0].label);
  }

  scanSuccessHandler(event:string){
    console.log(event);
    this.results.unshift(event);
    this.clienteService.getClientes().subscribe((clientes) => {
      this.clientes = clientes;
    });
    let clienteEscaneado = this.clientes.find( item => item.dni == event);
    if (clienteEscaneado !== undefined) { 
      this.clienteEscaneado = clienteEscaneado;
      this.pagoService.getLastPago(this.clienteEscaneado.id).subscribe((pago) => {
        this.ultimoPago = pago;
      });   
    }    
  }

  selectCamera(cameraLabel: string){    
    this.cameras.forEach(camera=>{
      if(camera.label.includes(cameraLabel)){
        this.myDevice=camera;
        console.log(camera.label);
        this.scannerEnabled=true;
      }
    })    
  }

}
