import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/servicios/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit{
  form: FormGroup;
  id: string | null;
  titulo = 'Agregar cliente';

  constructor(private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    private aRoute: ActivatedRoute){

    this.reactiveForm();
    this.id = this.aRoute.snapshot.paramMap.get('id');
    // console.log(this.id);
    
  }

 

  ngOnInit(): void {
    this.esEditar();
  }


  /* Reactive form */
  reactiveForm() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      obra: [''],
      direccion: [''],
      tel: [''],
      tel2: [''],
      comentario: ['']
    });
  }

  submitForm() {
    if(this.form.invalid){
      return;
    }

    if(this.id === null){
      this.add();
    }else{
      this.edit(this.id);
    }

    
  }

  edit(id: string){
    const cliente: any = {
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      dni: this.form.value.dni,
      obra: this.form.value.obra,
      direccion: this.form.value.direccion,
      tel: this.form.value.tel,
      tel2: this.form.value.tel2,
      comentario: this.form.value.comentario
    }

    this.clientService.update(id, cliente).then(() => {
      this.router.navigate(['/clientes']);
    }).catch(error => {
      console.log(error);      
    })
  }

  add(){
    const cliente: any = {
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      dni: this.form.value.dni,
      obra: this.form.value.obra,
      direccion: this.form.value.direccion,
      tel: this.form.value.tel,
      tel2: this.form.value.tel2,
      comentario: this.form.value.comentario
    }

    this.clientService.add(cliente).then(() => {
      // console.log('cliente registrado');
      this.router.navigate(['/clientes']);
    }).catch(error => {
      console.log(error);
    })
  }

  public myError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  }

  esEditar(){
    if(this.id !== null){
      this.titulo = "Editar cliente";
      this.clientService.get(this.id).subscribe(data => {
        // console.log(data);
        this.form.setValue({
          nombre: data.payload.data()['nombre'],
          apellido: data.payload.data()['apellido'],
          dni: data.payload.data()['dni'],
          direccion: data.payload.data()['direccion'],
          obra: data.payload.data()['obra'],
          tel: data.payload.data()['tel'],
          tel2: data.payload.data()['tel2'],
          comentario: data.payload.data()['comentario']
        })
      });
    }
  }
}
