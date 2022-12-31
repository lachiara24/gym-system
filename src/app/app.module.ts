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

const rutas: Routes = [
  { path: '', component: ClientesComponent },
  { path: 'pagos/:idcliente', component: PagosComponent },
  { path: 'qr', component: LectorQRComponent},
  { path: 'imprimir/:nombre/:apellido/:dni', component:ImprimirComponent },
  { path: 'imprimir', component: ImprimirTodosComponent}
];

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
    ImprimirTodosComponent
  ],
  imports: [
    BrowserModule,
    QRCodeModule,
    ZXingScannerModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(rutas),
    NgxPrintModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
