import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUrl = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class DoorService {

  constructor(private http: HttpClient) { }

  open(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }


}
