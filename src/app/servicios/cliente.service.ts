import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cliente } from '../Cliente';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  apiUrl: string = 'http://localhost:8080/api/clientes/';

  constructor(private http: HttpClient) { }

  
  getClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  getCliente(id: any): Observable<Cliente> {
    const url = `${this.apiUrl}${id}`;
    return this.http.get<Cliente>(url);
  }

  addCliente(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(this.apiUrl, cliente, httpOptions);    
  }


  updateCliente(cliente: Cliente): Observable<Cliente>{
    console.log(cliente.id);
    const url = this.apiUrl + cliente.id;
    this.http.post<Cliente>('http://localhost:8080/api/' + cliente.id + '/direccion', cliente.dire, httpOptions);
    return this.http.put<Cliente>(url, cliente, httpOptions);
  }

  deleteCliente(id): Observable<Cliente>{
    const url = this.apiUrl+ id;
    return this.http.delete<Cliente>(url);
  }
}
