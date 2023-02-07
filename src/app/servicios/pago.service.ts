import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';



@Injectable({
  providedIn: 'root'
})
export class PagoService {

  constructor(private db: AngularFirestore){}

  getAll(id: string){
    return this.db.collection('pagos', ref => ref.where('idcliente','==', id )).snapshotChanges();
  }

  getLast(id: string): Observable<any>{
    return this.db.collection('pagos', ref => 
      (ref.orderBy('date', 'desc').limit(1)) && ref.where('idcliente','==', id )).snapshotChanges();
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

  
}
