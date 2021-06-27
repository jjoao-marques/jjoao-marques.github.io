import { TechnicianService } from './../../../../services/technician.service';
import { Technician } from './../../../../models/technician';
import { AfterViewInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';


@Component({
  selector: 'app-technician-read',
  templateUrl: './technician-read.component.html',
  styleUrls: ['./technician-read.component.css']
})
export class TechnicianReadComponent implements AfterViewInit {

  technicians : Technician[] = [];


  displayedColumns: string[] = ['id', 'name', 'cpf', 'telephone', 'action'];
  dataSource = new MatTableDataSource<Technician>(this.technicians);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service : TechnicianService,
    private router: Router) { }

  ngAfterViewInit() {
    this.findAll();
  }

  findAll() : void {
    this.service.findAll().subscribe((response) => {
      this.technicians = response;
      this.dataSource = new MatTableDataSource<Technician>(this.technicians);
      this.dataSource.paginator = this.paginator;
    })
  }

  navigateToCreate(): void {
    this.router.navigate(['technicians/create'])
  }
}

