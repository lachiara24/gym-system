import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router, private afAuth: AngularFireAuth,
    private toastr: ToastrService){}

  private admin: string[] = ['KSAnZxvXiXZoh6fqo1Af4B4OLQZ2', '9ZJONwMjkrWofQdAr6LAJtYyuTv1'];

  canActivate() {
    this.afAuth.currentUser.then((user) => {
      if(user?.uid){
        // console.log(user);
        if(!this.admin.includes(user?.uid)){
          this.toastr.warning('No tiene los suficientes permisos','Acceso denegado');
          this.router.navigate(['/login']);
          return false;
        }
      }
      return true;
      
    })
    return true;
  }
  
}
