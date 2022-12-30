import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pago } from '../Pago';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  apiUrl: string = 'http://localhost:8080/api/pagos/';

  constructor(private http: HttpClient) { }

 
}
