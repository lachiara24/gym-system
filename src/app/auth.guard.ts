import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService){}

  private admin: string[] = ['KSAnZxvXiXZoh6fqo1Af4B4OLQZ2', 'uhUDYBYjrxOHQ4wvu6PI6HdAwoB3'];

  canActivate(){
    this.afAuth.currentUser.then((user) => {
      if (user === null) {
        // console.log('No estás logueado');
        this.toastr.warning('Para ingresar a esa sección debe ingresar con su cuenta', 'Sesión no iniciada');
        this.router.navigate(['/']);
        return false;
      }      
      return true;
    })
    return true;
  }
  
}
