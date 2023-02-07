import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseErrorService } from 'src/app/servicios/firebase-error.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent {
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
      correo: ['', Validators.required]
    });
  }

  submitForm() {
    if(this.form.invalid){
      return;
    }

    // console.log(this.form.value);
    const email = this.form.value.correo;
    this.afAuth.sendPasswordResetEmail(email).then(() => {
      this.toastr.info('Se ha enviado un correo para recuperar la contraseña', 'Revise su correo');
      this.router.navigate(['/login']);
    }).catch((error) => {
      // console.log(error);
      this.toastr.error(this.error.firebaseError(error.code), 'Error');     
      
    })
    
  }

  public myError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  }
}
