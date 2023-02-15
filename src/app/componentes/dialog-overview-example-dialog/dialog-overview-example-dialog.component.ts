import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PagoService } from 'src/app/servicios/pago.service';

@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.component.html',
  styleUrls: ['./dialog-overview-example-dialog.component.css']
})
export class DialogOverviewExampleDialogComponent {
  pagos: any[] = [];
  a: any;
  ultimoPago: any;
  cliente: any;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
        private pagoService: PagoService,
        @Inject(MAT_DIALOG_DATA) data) {
        dialogRef.disableClose = false;
        this.cliente = data.cliente;
    }

    ngOnInit() {
        this.getPagos(this.cliente.id);
    }

    save() {
        // this.dialogRef.close(this.form.value);
    }

    close() {
        this.dialogRef.close();
    }

    getPagos(id: string){
      this.pagoService.getAll(id).subscribe(data => {
        this.pagos = [];
        data.forEach((element: any) => {
          // console.log(element.payload.doc.id);
          this.pagos.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          })
        });
        // console.log(this.pagos);
        this.a = this.pagos.slice(-1);
        // console.log(this.a[0]);
        this.ultimoPago = {
          pago: new Date(this.a[0].pago.seconds * 1000),
          venc: new Date(this.a[0].venc.seconds * 1000)
        }
        // console.log(this.ultimoPago);
      });
    }
}
