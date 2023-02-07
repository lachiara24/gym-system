import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseErrorService } from 'src/app/servicios/firebase-error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router,
    private afAuth: AngularFireAuth,
    private error: FirebaseErrorService,
    private toastr: ToastrService){

    this.reactiveForm();
    
  }
  /* Reactive form */
  reactiveForm() {
    this.form = this.fb.group({
      correo: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submitForm() {
    if(this.form.invalid){
      return;
    }

    // console.log(this.form.value);
    const email = this.form.value.correo;
    const password = this.form.value.password;

    this.afAuth.signInWithEmailAndPassword(email, password).then((user) => {
      // console.log(user);
      if(user.user?.emailVerified){
        console.log(user);
        
        this.router.navigate(['/clientes']);
      }else{
        this.router.navigate(['/verificar-correo']);
      }
      
    }).catch((error) => {
      // console.log(error);
      this.toastr.error(this.error.firebaseError(error.code), 'Error');
      
    })
    
  }

  public myError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  }
}
