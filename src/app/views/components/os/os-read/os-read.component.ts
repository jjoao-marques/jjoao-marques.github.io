import { ClientService } from 'src/app/services/client.service';
import { TechnicianService } from 'src/app/services/technician.service';
import { Technician } from 'src/app/models/technician';
import { OsService } from './../../../../services/os.service';
import { OS } from './../../../../models/OS';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-os-read',
  templateUrl: './os-read.component.html',
  styleUrls: ['./os-read.component.css']
})
export class OsReadComponent implements AfterViewInit {

  osList : OS[] = [];


  displayedColumns: string[] = ['client', 'technician', 'priority', 'status', 'openingDate', 'action'];
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
        if(x.status != "CLOSED") {
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

  navigateToCreate(): void {
    this.router.navigate(['os/create'])
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

