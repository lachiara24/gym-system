import { Component, OnInit} from '@angular/core';
import { Cliente } from 'src/app/Cliente';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-imprimir',
  templateUrl: './imprimir.component.html',
  styleUrls: ['./imprimir.component.css']
})
export class ImprimirComponent implements OnInit{
  clienteImprimir: Cliente = {nombre:'',apellido:'',dni:''};
  nombre;
  apellido;
  dni;

  constructor(private rutaActiva: ActivatedRoute){}

  ngOnInit() {
    this.nombre = this.rutaActiva.snapshot.params['nombre'];
    this.apellido = this.rutaActiva.snapshot.params['apellido'];
    this.dni = this.rutaActiva.snapshot.params['dni'];
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.nombre = params['nombre'];
        this.apellido = params['apellido'];
        this.dni = params['dni'];
      }
    );
    this.clienteImprimir.nombre = this.nombre;
    this.clienteImprimir.apellido = this.apellido;
    this.clienteImprimir.dni = this.dni;
  }  
}
