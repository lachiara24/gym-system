import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirebaseErrorService {

  constructor() { }

  firebaseError(code: string){
    switch(code){

      // email ya existe
      case 'auth/email-already-in-use':
        return 'El email ya está registrado';

      // password debil
      case 'auth/weak-password':
        return 'La contraseña es débil';

      // email invalido
      case 'auth/invalid-email':
        return 'El correo es inválido';

      // usuario no está registrado
      case 'auth/user-not-found':
        return 'El usuario no está registrado';

      // password incorrecta
      case 'auth/wrong-password':
        return 'La contraseña es incorrecta';
      
      default:
        return 'Error desconocido';
    }
  }
}
