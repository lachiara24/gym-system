import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ClientesItemComponent } from './componentes/clientes-item/clientes-item.component';
// importo modulo del escaner QR
import { ZXingScannerModule } from '@zxing/ngx-scanner';

// importo modulo del generador QR
import { QRCodeModule } from 'angularx-qrcode';
import { LectorQRComponent } from './componentes/lector-qr/lector-qr.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { DdMmYYYYDatePipe } from './dd-mm-yyyy-date.pipe';
import {NgxPrintModule} from 'ngx-print';
import { ImprimirTodosComponent } from './componentes/imprimir-todos/imprimir-todos.component';

import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { AddClientComponent } from './componentes/add-client/add-client.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AddPagoComponent } from './componentes/add-pago/add-pago.component';
import { PagosListComponent } from './componentes/pagos-list/pagos-list.component';
/// angular material
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ClientsListComponent } from './componentes/clients-list/clients-list.component';
import {MatTableModule} from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import { LoginComponent } from './componentes/login/login.component';
import { RegistrarUsuarioComponent } from './componentes/registrar-usuario/registrar-usuario.component';
import { VerificarCorreoComponent } from './componentes/verificar-correo/verificar-correo.component';
import { RecuperarPasswordComponent } from './componentes/recuperar-password/recuperar-password.component';
import { ToastrModule } from 'ngx-toastr';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';
import {MatSortModule} from '@angular/material/sort';

import { DialogOverviewExampleDialogComponent } from './componentes/dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';

const rutas: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'clientes', canActivate: [AuthGuard, AdminGuard], component: ClientsListComponent},
  { path: 'pagos/:idcliente', canActivate: [AuthGuard, AdminGuard], component: PagosListComponent},
  { path: 'edit-pago/:id', canActivate: [AuthGuard, AdminGuard], component: AddPagoComponent},
  { path: 'add-pago/:idcliente', canActivate: [AuthGuard, AdminGuard], component: AddPagoComponent},
  { path: 'qr', component: LectorQRComponent},
  { path: 'imprimir',canActivate: [AuthGuard, AdminGuard], component: ImprimirTodosComponent},
  { path: 'add-cliente', canActivate: [AuthGuard, AdminGuard], component: AddClientComponent},
  { path: 'clientes/:id', canActivate: [AuthGuard, AdminGuard], component: AddClientComponent},
  { path: 'clientes', canActivate: [AuthGuard, AdminGuard], component: ClientsListComponent}, 
  { path: 'login', component: LoginComponent},
  { path: 'recuperar-password', component: RecuperarPasswordComponent},
  { path: 'verificar-correo', component: VerificarCorreoComponent},
  { path: 'registrar-usuario', component: RegistrarUsuarioComponent},
  { path: '**', redirectTo: 'login', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    ClientesItemComponent,
    LectorQRComponent,
    DdMmYYYYDatePipe,
    ImprimirTodosComponent,
    AddClientComponent,
    ClientsListComponent,
    PagosListComponent,
    AddPagoComponent,
    LoginComponent,
    RegistrarUsuarioComponent,
    VerificarCorreoComponent,
    RecuperarPasswordComponent,
    DashboardComponent,
    DialogOverviewExampleDialogComponent
  ],
  imports: [
    BrowserModule,
    QRCodeModule,
    ZXingScannerModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(rutas),
    NgxPrintModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatCardModule,
    ToastrModule.forRoot(),
    MatSortModule,
    MatDialogModule,
    MatPaginatorModule
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideFirestore(() => getFirestore())
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogOverviewExampleDialogComponent]
})
export class AppModule { }
