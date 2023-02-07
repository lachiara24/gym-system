import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { ClientesItemComponent } from './componentes/clientes-item/clientes-item.component';
// importo modulo del escaner QR
import { ZXingScannerModule } from '@zxing/ngx-scanner';

// importo modulo del generador QR
import { QRCodeModule } from 'angularx-qrcode';
import { LectorQRComponent } from './componentes/lector-qr/lector-qr.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalEditComponent } from './componentes/modal-edit/modal-edit.component';
import { ModalEjComponent } from './componentes/modal-ej/modal-ej.component';
import { FormsModule } from '@angular/forms';
import { ModalNewComponent } from './componentes/modal-new/modal-new.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalDeleteComponent } from './componentes/modal-delete/modal-delete.component';
import { PagosComponent } from './componentes/pagos/pagos.component';
import { Routes, RouterModule } from '@angular/router';
import { ModalNewPagoComponent } from './componentes/modal-new-pago/modal-new-pago.component';
import { ModalEditPagoComponent } from './componentes/modal-edit-pago/modal-edit-pago.component';
import { ModalDeletePagoComponent } from './componentes/modal-delete-pago/modal-delete-pago.component';
import { DdMmYYYYDatePipe } from './dd-mm-yyyy-date.pipe';
import { FilterPipe } from './filter.pipe';
import {NgxPrintModule} from 'ngx-print';
import { ImprimirComponent } from './componentes/imprimir/imprimir.component';
import { ImprimirTodosComponent } from './componentes/imprimir-todos/imprimir-todos.component';
import { PaginationPipe } from './pagination.pipe';
import { HelloComponent } from './componentes/hello/hello.component';
import { PaginationComponent } from './componentes/pagination/pagination.component';

import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AddClientComponent } from './componentes/add-client/add-client.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AddPagoComponent } from './componentes/add-pago/add-pago.component';
import { PagosListComponent } from './componentes/pagos-list/pagos-list.component';
/// angular material
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
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
    ClientesComponent,
    ClientesItemComponent,
    LectorQRComponent,
    ModalEditComponent,
    ModalEjComponent,
    ModalNewComponent,
    ModalDeleteComponent,
    PagosComponent,
    ModalNewPagoComponent,
    ModalEditPagoComponent,
    ModalDeletePagoComponent,
    DdMmYYYYDatePipe,
    FilterPipe,
    ImprimirComponent,
    ImprimirTodosComponent,
    PaginationPipe,
    HelloComponent,
    PaginationComponent,
    AddClientComponent,
    ClientsListComponent,
    PagosListComponent,
    AddPagoComponent,
    LoginComponent,
    RegistrarUsuarioComponent,
    VerificarCorreoComponent,
    RecuperarPasswordComponent,
    DashboardComponent
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
    MatSortModule
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideFirestore(() => getFirestore())
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
