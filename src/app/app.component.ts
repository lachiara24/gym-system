import { Component, OnInit} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DoorService } from './servicios/door.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'gym-system';
  logged: boolean = false;
  
  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private door: DoorService,
    private toastr: ToastrService){
  }

  openDoor(){
    const data = {
      name: 'matias',
      password: 'GYM9785'
    }
    this.toastr.success("","Abriendo puerta");
    
    this.door.open(data).subscribe(d =>{
      
    })
  }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        this.logged = true;
        console.log('user is logged in');
        this.door.getIp();
      } else {
        console.log('user not logged in');
        this.router.navigate(['/login']);
      }
    });
  }

  logOut(){
    this.logged = false;
    this.afAuth.signOut().then(() => {
      
      this.router.navigate(['/login']);
    })
  }

}
