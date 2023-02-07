import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private db: AngularFirestore) { }

  getAll(): Observable<any> {
    return this.db.collection('clientes').snapshotChanges();
  }

  add(client: any): Promise<any>{
    return this.db.collection('clientes').add(client);
  }

  get(id: string): Observable<any>{
    return this.db.collection('clientes').doc(id).snapshotChanges();
  }

  delete(id: string): Promise<any>{
    return this.db.collection('clientes').doc(id).delete();
  }

  update(id: string, data: any): Promise<any>{
    return this.db.collection('clientes').doc(id).update(data);
  }
}
