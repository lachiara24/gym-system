import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit} from '@angular/core';
import { ClientService } from 'src/app/servicios/client.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';

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


  @ViewChild('empTbSort') empTbSort = new MatSort();

  ngAfterViewInit() {
    // this.dataSource.sort = this.empTbSort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnDestroy(){
    this.selectedClients = [];
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
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

  constructor(private client: ClientService, private router: Router,
    private _liveAnnouncer: LiveAnnouncer) {
  }

  ngOnInit(): void {
    this.getClients();
    
  }

  getClients(){
    this.client.getAll().subscribe(data => {
      this.clients = [];
      data.forEach((element: any) => {
        console.log(element.payload.doc.data());
      
        // console.log(element.payload.doc.id);
        this.clients.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      this.dataSource = new MatTableDataSource<any>(this.clients);
      this.dataSource.sort = this.empTbSort;
      
    });
  }



  

  delete(id: string){
    this.client.delete(id).then(() => {
      console.log("eliminado");
    }).catch(error => {
      console.log(error);
    })
  }

}
