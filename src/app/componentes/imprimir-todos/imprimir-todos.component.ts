import { ConstantPool } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/Cliente';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-imprimir-todos',
  templateUrl: './imprimir-todos.component.html',
  styleUrls: ['./imprimir-todos.component.css']
})
export class ImprimirTodosComponent implements OnInit {
  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService){}

  ngOnInit() {
    this.clienteService.getClientes().subscribe((clientes) => {
      this.clientes = clientes
    });        
  }

}
