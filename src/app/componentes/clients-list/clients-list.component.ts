import { Component, Inject, OnInit, OnDestroy, ViewChild, AfterViewInit} from '@angular/core';
import { ClientService } from 'src/app/servicios/client.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { PagoService } from 'src/app/servicios/pago.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogOverviewExampleDialogComponent } from '../dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { MatPaginator } from '@angular/material/paginator';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit, OnDestroy, AfterViewInit{
  displayedColumns: string[] = ['select','nombre', 'dni', 'actions'];
  
  clients: any[] = [];
  panelOpenState = false;
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  selectedClients: any[] = [];
  clientePago: any[] = [];

  @ViewChild('paginator') paginator: MatPaginator;

  
  // @ViewChild('empTbSort') empTbSort = new MatSort();

  // /** Announce the change in sort state for assistive technology. */
  // announceSortChange(sortState: Sort) {
  //   // This example uses English messages. If your application supports
  //   // multiple language, you would internationalize these strings.
  //   // Furthermore, you can customize the message to add additional
  //   // details about the values being sorted.
  //   if (sortState.direction) {
  //     this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  //   } else {
  //     this._liveAnnouncer.announce('Sorting cleared');
  //   }
  // }

  ngOnDestroy(){
    this.selectedClients = [];
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  ngAfterViewInit(): void {
      // this.dataSource.paginator = this.paginator;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  imprimir(){
    // console.log(this.selection.selected);
    this.selection.selected.forEach(s => {
      // console.log(s);
      this.selectedClients.push(s.id);
    })        
    const options = {queryParams: {words: this.selectedClients}};
    this.router.navigate(['/imprimir'], options);
  }

  constructor(private client: ClientService, 
    private pago: PagoService,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getClients();
  }

  getLastPago(){
    this.clientePago = [];
    this.clients.forEach(c => {
      this.pago.getLast(c.id).subscribe(data => {        
        
        data.forEach((element: any) => {      
        // console.log(element.payload.doc.id);
        let lastPago = {
          id: element.payload.doc.id,
          pago: '',
          venc: '',
          ...element.payload.doc.data()
        };
        this.clientePago.push(lastPago);
      });
      
      });     
      
    });
    console.log(this.clientePago);
    
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
}

  getClients(){
    this.client.getAll().subscribe(data => {
      this.clients = [];
      data.forEach((element: any) => {      
        // console.log(element.payload.doc.id);
        this.clients.push({
          id: element.payload.doc.id,
          pago: '',
          venc: '',
          ...element.payload.doc.data()
        })
      });
      // // console.log(this.clients)
      //  this.getLastPago();

      // console.log(this.clients);
      // console.log(this.clientePago);
      
      this.dataSource = new MatTableDataSource<any>(this.clients);
      this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.empTbSort;
    });
  }



  

  delete(id: string){
    this.client.delete(id).then(() => {
      console.log("eliminado");
    }).catch(error => {
      console.log(error);
    })
  }


  openDialog(element: any) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      cliente: element,
      title: 'Información de cliente'
  };

    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => console.log("Dialog output:", data)
    );    
}

}


