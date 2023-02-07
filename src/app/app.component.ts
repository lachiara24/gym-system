import { Component, OnInit} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'gym-system';
  logged: boolean = false;
  
  constructor(private afAuth: AngularFireAuth,
    private router: Router){
  }

  ngOnInit(): void {
    this.afAuth.currentUser.then((user) => {
      if(user && user.emailVerified){
        this.logged = true;
      } else{
        this.router.navigate(['/login']);
      }
    })
  }

  logOut(){
    this.afAuth.signOut().then(() => {
      this.logged = false;
      this.router.navigate(['/login']);
    })
  }

}
