import { Component } from '@angular/core';

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

  constructor() {
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
    // let clienteEscaneado = this.clientes.find( item => item.dni == event);
    // if (clienteEscaneado !== undefined) { 
    //   this.clienteEscaneado = clienteEscaneado;
    // }
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
