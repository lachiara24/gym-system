import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verificar-correo',
  templateUrl: './verificar-correo.component.html',
  styleUrls: ['./verificar-correo.component.css']
})
export class VerificarCorreoComponent {

  constructor(private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router){}

  verificarCorreo(){
    this.afAuth.currentUser.then((user) => {
      user?.sendEmailVerification()
    }).then(() => {
      this.toastr.info('Se ha enviado un correo para hacer la verificación', 'Verifique su correo');
      this.router.navigate(['/login']);
    })
  }
}
