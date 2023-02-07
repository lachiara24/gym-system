import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pago } from '../Pago';
import { AngularFirestore } from '@angular/fire/compat/firestore';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  constructor(private db: AngularFirestore, private http: HttpClient){}

  getAll(id: string){
    return this.db.collection('pagos', ref => ref.where('idcliente','==', id )).snapshotChanges();
  }


  add(pago: any): Promise<any>{
    return this.db.collection('pagos').add(pago);
  }

  get(id: string): Observable<any>{
    return this.db.collection('pagos').doc(id).snapshotChanges();
  }

  delete(id: string): Promise<any>{
    return this.db.collection('pagos').doc(id).delete();
  }

  update(id: string, data: any): Promise<any>{
    return this.db.collection('pagos').doc(id).update(data);
  }

  apiUrl: string = 'http://localhost:8080/api/';

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
