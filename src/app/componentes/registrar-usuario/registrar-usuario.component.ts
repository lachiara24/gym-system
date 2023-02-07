import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseErrorService } from 'src/app/servicios/firebase-error.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private error: FirebaseErrorService){

    this.reactiveForm();
    
  }
  /* Reactive form */
  reactiveForm() {
    this.form = this.fb.group({
      correo: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]
    });
  }

  submitForm() {
    if(this.form.invalid){
      return;
    }

    const email = this.form.value.correo;
    const password = this.form.value.password;
    const passwordConfirm = this.form.value.passwordConfirm;

    if(password !== passwordConfirm){
      this.toastr.error('Las contraseñas deben coincidir', 'Error');
      return;
    }

    this.afAuth.createUserWithEmailAndPassword(email, password).then((user) => {
      // console.log(user);
      this.verificarCorreo();
      
    }).catch((error) => {
      // console.log(error);
      this.toastr.error(this.error.firebaseError(error.code), 'Error');
    })
  }

  verificarCorreo(){
    this.afAuth.currentUser.then((user) => {
      user?.sendEmailVerification()
    }).then(() => {
      this.toastr.info('Se ha enviado un correo para hacer la verificación', 'Verifique su correo');
      this.router.navigate(['/login']);
    })
  }

  

  public myError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  }
}
