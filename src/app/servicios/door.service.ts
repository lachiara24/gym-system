import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DoorService {

  constructor(private http: HttpClient,
    private db: AngularFirestore) { }

  url: any;

  getIp(){
    this.db.collection('info').snapshotChanges().subscribe(data => {
      data.forEach((element: any) => {      
        this.url = {
          ip: element.payload.doc.data()['ip']  
        }  
      })
    });
  }


  open(data: any): Observable<any> {    
    return this.http.post('http://' + this.url.ip + '/open', data);
  }


}
