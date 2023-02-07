import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PagoService } from 'src/app/servicios/pago.service';

@Component({
  selector: 'app-add-pago',
  templateUrl: './add-pago.component.html',
  styleUrls: ['./add-pago.component.css']
})
export class AddPagoComponent implements OnInit{
  form: FormGroup;
  titulo = 'Agregar pago';
  idCliente: string | null;
  idPago: string | null;

  constructor(private fb: FormBuilder, private aRoute: ActivatedRoute,
    private pagoService: PagoService,
    private router: Router){
    

    this.idCliente = this.aRoute.snapshot.paramMap.get('idcliente');
    // console.log(this.idCliente);
    this.reactiveForm();

    this.idPago = this.aRoute.snapshot.paramMap.get('id');
    // console.log(this.idPago);   


  }

  reactiveForm(){
    this.form = this.fb.group({
      idcliente: this.idCliente,
      pago: ['', Validators.required],
      venc: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.esEditar();

  }

  submitForm(){
    // console.log(this.form.value);
    if(!this.form.valid){
      return
    }
    if(this.idPago === null){
      this.add();
    }else{
      this.edit(this.idPago);
    }
    
  }

  esEditar(){
    if(this.idPago !== null){
      this.titulo = "Editar pago";
      this.pagoService.get(this.idPago).subscribe(data => {
        // console.log(data);
        this.form.setValue({
          idcliente: data.payload.data()['idcliente'],
          pago: new Date(data.payload.data()['pago'].seconds * 1000),
          venc: new Date(data.payload.data()['venc'].seconds * 1000)
        });
        this.idCliente = data.payload.data()['idcliente'];
      });
     
    }
  }

  edit(id: string){
    const pago: any = {
      idcliente: this.idCliente,
      pago: this.form.value.pago,
      venc: this.form.value.venc
    }

    this.pagoService.update(id, pago).then(() => {
      this.router.navigate(['/pagos/', this.idCliente]);
    }).catch(error => {
      console.log(error);      
    })
  }

  add(){
    const pago: any = {
      idcliente: this.idCliente,
      pago: this.form.value.pago,
      venc: this.form.value.venc
    }

    this.pagoService.add(pago).then(() => {
      // console.log('cliente registrado');
      this.router.navigate(['/pagos/', this.idCliente]);
    }).catch(error => {
      console.log(error);
    })
  }
}
