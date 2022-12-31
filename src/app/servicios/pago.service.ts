import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pago } from '../Pago';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  apiUrl: string = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) { }

  getPagos(clienteId): Observable<Pago[]>{
    return this.http.get<Pago[]>(this.apiUrl+clienteId+"/pagos");
  }

  getPago(clienteId, id: any): Observable<Pago> {
    const url = this.apiUrl+clienteId+"/pagos/"+id;
    return this.http.get<Pago>(url);
  }

  addPago(clienteId, pago: Pago): Observable<Pago>{
    return this.http.post<Pago>(this.apiUrl+clienteId+"/pagos", pago, httpOptions);
  }

  updatePago(clienteId, pago: Pago): Observable<Pago>{
    console.log(pago.id);
    const url = this.apiUrl + clienteId + "/pagos/" + pago.id;
    return this.http.put<Pago>(url, pago, httpOptions);
  }

  deletePago(clienteId, id): Observable<Pago>{
    const url = this.apiUrl+ clienteId + "/pagos/" + id;
    return this.http.delete<Pago>(url);
  }
 
  getLastPago(clienteId): Observable<Pago>{
    const url = this.apiUrl+clienteId+"/pagos/last";
    return this.http.get<Pago>(url);
  }
}
