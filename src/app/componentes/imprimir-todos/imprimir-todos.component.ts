import { ConstantPool } from '@angular/compiler';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/Cliente';
import { ClientService } from 'src/app/servicios/client.service';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-imprimir-todos',
  templateUrl: './imprimir-todos.component.html',
  styleUrls: ['./imprimir-todos.component.css']
})
export class ImprimirTodosComponent implements OnInit, OnDestroy{
  clientes: any[] = [];
  words: string[];
  constructor(private clienteService: ClienteService,
    private aRoute: ActivatedRoute,
    private clientService: ClientService){
    this.aRoute.queryParamMap.subscribe(params => this.words = params.getAll('words'));      
    // console.log(this.words);
    this.clientes = [];
    this.words.forEach(c => {
      // console.log(c);      
      this.clientService.get(c).subscribe(data => {
        // console.log(data);        
        this.clientes.push({
          nombre: data.payload.data()['nombre'],
          apellido: data.payload.data()['apellido'],
          dni: data.payload.data()['dni']
        });        
      })
    })
    // console.log(this.clientes);
    this.clientes = this.removeDuplicates(this.clientes);
  }

  removeDuplicates(arr) {
    return arr.filter((item, 
        index) => arr.indexOf(item) === index);
  }

  ngOnInit() {
    // this.clienteService.getClientes().subscribe((clientes) => {
    //   this.clientes = clientes
    // });  

    
    
  }

  ngOnDestroy() {
    this.clientes = []; 
  }

}
