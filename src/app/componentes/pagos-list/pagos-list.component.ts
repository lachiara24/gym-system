import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/servicios/client.service';
import { PagoService } from 'src/app/servicios/pago.service';

@Component({
  selector: 'app-pagos-list',
  templateUrl: './pagos-list.component.html',
  styleUrls: ['./pagos-list.component.css']
})
export class PagosListComponent implements OnInit{
  displayedColumns: string[] = ['pago', 'venc', 'actions'];

  pagos: any[] = [];
  
  id: string | null;
  cliente: any = {
    id: '',
    nombre: '',
    apellido: ''
  }

  constructor(private pago: PagoService, private aRoute: ActivatedRoute,
    private client: ClientService) {
    this.id = this.aRoute.snapshot.paramMap.get('idcliente');
    console.log(this.id);
    if(this.id !== null){
      this.client.get(this.id).subscribe(data => {
        // console.log(data);
        this.cliente = {
          id: this.id,
          nombre: data.payload.data()['nombre'],
          apellido: data.payload.data()['apellido']
        }
      });
      this.getPagos(this.id);
    }
  }



  ngOnInit(): void {
    
  }

  getPagos(id: string){
    this.pago.getAll(id).subscribe(data => {
      this.pagos = [];
      data.forEach((element: any) => {
        // console.log(element.payload.doc.id);
        this.pagos.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      // console.log(this.pagos);
      
    });
  }

  delete(id: string){
    this.pago.delete(id).then(() => {
      // console.log("eliminado");
    }).catch(error => {
      console.log(error);
    })
  }
}
