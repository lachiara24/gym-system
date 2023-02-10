import { Component } from '@angular/core';
import { PagoService } from 'src/app/servicios/pago.service';
import { ClientService } from 'src/app/servicios/client.service';
import { ToastrService } from 'ngx-toastr';
import { DoorService } from 'src/app/servicios/door.service';

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
  fechaActual: Date = new Date(new Date().toDateString());
  a: any;
  lastEvent: any = 0;
  times: number = 0;

  constructor(
    private pagoService:PagoService,
    private client: ClientService,
    private toastr: ToastrService,
    private door: DoorService
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
      if(this.clienteActivo(this.ultimoPago.venc)){
        this.openDoor();
        this.toastr.success("","Abriendo puerta");
      }else{
        this.toastr.error("Cuota vencida","Acceso denegado");
      }
    });
  }

  camerasFoundHandler(cameras: MediaDeviceInfo[]){
    this.cameras=cameras;
    this.selectCamera(this.cameras[0].label);
  }

  scanSuccessHandler(event:string){
    console.log(event);
    this.results.unshift(event);
    if(event === this.lastEvent){
      return;
    }
    
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
      this.lastEvent = event;
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

  openDoor(){
    const data = {
      name: 'matias',
      password: 'GYM9785'
    }
    
    this.door.open(data).subscribe(d =>{
      
    })
  }

}
