import { AfterViewInit, Component, ElementRef, Inject, Renderer2 } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import { from } from 'rxjs'
import { concatMap } from 'rxjs/operators'
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-qr-view',
  templateUrl: './qr-view.component.html',
  styleUrls: ['./qr-view.component.css']
})
export class QrViewComponent {
  pagos: any[] = [];
  a: any;
  ultimoPago: any;
  cliente: any;
  @ViewChild('capture') capture: ElementRef;

    constructor(
        private dialogRef: MatDialogRef<QrViewComponent>,
        private renderer2: Renderer2,
        @Inject(MAT_DIALOG_DATA) data) {

        this.cliente = data.cliente;
    }


    ngOnInit() {
        
    }

    save() {
        // this.dialogRef.close(this.form.value);
    }

    close() {
        this.dialogRef.close();
    }


    public downloadDivs(cliente: any) {
      const docElem = this.capture.nativeElement;
      from(html2canvas(docElem).then(function (canvas) {
            let generatedImage = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
            let a = document.createElement('a');
            a.href = generatedImage;
            a.download = `${cliente.nombre + cliente.apellido}.png`;
            a.click();
            return `${cliente.nombre + cliente.apellido}.png`;
      }));
    }
    
}
