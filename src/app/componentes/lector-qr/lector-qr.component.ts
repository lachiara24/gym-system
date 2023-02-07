import { Component } from '@angular/core';
import { PagoService } from 'src/app/servicios/pago.service';
import { ClientService } from 'src/app/servicios/client.service';

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
  clientes: any[] = [];
  clienteEscaneado: any;
  ultimoPago: any;
  pagos: any[] = [];

  a: any;

  constructor(
    private pagoService:PagoService,
    private client: ClientService
  ) {
    this.getClients();
    // this.getPagos("GfBRqt9fNfQjvd2pvZgU");
  }

  getClients(){
    this.client.getAll().subscribe(data => {
      this.clientes = [];
      data.forEach((element: any) => {
        // console.log(element.payload.doc.id);
        this.clientes.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      // console.log(this.clientes);
      
    });
  }

  getPagos(id: string){
    this.pagoService.getAll(id).subscribe(data => {
      this.pagos = [];
      data.forEach((element: any) => {
        // console.log(element.payload.doc.id);
        this.pagos.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      // console.log(this.pagos);
      this.a = this.pagos.slice(-1);
      // console.log(this.a[0]);
      this.ultimoPago = {
        pago: new Date(this.a[0].pago.seconds * 1000),
        venc: new Date(this.a[0].venc.seconds * 1000)
      }
      // console.log(this.ultimoPago);
    });
  }

  camerasFoundHandler(cameras: MediaDeviceInfo[]){
    this.cameras=cameras;
    this.selectCamera(this.cameras[0].label);
  }

  scanSuccessHandler(event:string){
    console.log(event);
    this.results.unshift(event);
    
    
    // this.clienteService.getClientes().subscribe((clientes) => {
    //   this.clientes = clientes;
    // });
    let clienteEscaneado = this.clientes.find( item => item.dni == event);
    if (clienteEscaneado !== undefined) { 
      this.clienteEscaneado = clienteEscaneado;
      // console.log(clienteEscaneado);
      
      this.getPagos(clienteEscaneado.id);
      
      
      // this.pagoService.getLastPago(this.clienteEscaneado.id).subscribe((pago) => {
      //   this.ultimoPago = pago;
      // });   
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
