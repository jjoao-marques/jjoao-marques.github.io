import { OsService } from 'src/app/services/os.service';
import { MatTableDataSource } from '@angular/material/table';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { OS } from 'src/app/models/OS';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { TechnicianService } from 'src/app/services/technician.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-os-closed',
  templateUrl: './os-closed.component.html',
  styleUrls: ['./os-closed.component.css']
})
export class OsClosedComponent implements AfterViewInit {

  osList : OS[] = [];


  displayedColumns: string[] = ['client', 'technician', 'priority', 'status', 'openingDate', 'closingDate', 'action'];
  dataSource = new MatTableDataSource<OS>(this.osList);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private osService : OsService,
    private router: Router,
    private technicianService: TechnicianService,
    private clientService: ClientService) { }

  ngAfterViewInit() {
    this.findAll();
  }

  findAll() : void {
    this.osService.findAll().subscribe((response) => {
      response.forEach(x => {
        if(x.status === "CLOSED") {
          this.osList.push(x)
        }
      })

      this.listTechnician();
      this.listClient();
      this.dataSource = new MatTableDataSource<OS>(this.osList);
      this.dataSource.paginator = this.paginator;
    })
  }

  listTechnician():void {
    this.osList.forEach(x => {
      this.technicianService.findById(x.technician).subscribe(response => {
        x.technician = response.name
      })
    })
  }

  listClient():void {
    this.osList.forEach(x => {
      this.clientService.findById(x.client).subscribe(response => {
        x.client = response.name
      })
    })
  }


  priority(x: any) {
    if( x == 'LOW') {
      return 'low';
    } else if (x == 'MEDIUM') {
      return 'medium';
    } else {
      return 'high';
    }
  }
}

