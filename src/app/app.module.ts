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

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    ClientesItemComponent,
    LectorQRComponent,
    ModalEditComponent,
    ModalEjComponent,
    ModalNewComponent,
    ModalDeleteComponent
  ],
  imports: [
    BrowserModule,
    QRCodeModule,
    ZXingScannerModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
