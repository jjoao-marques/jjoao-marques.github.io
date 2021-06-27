import { AfterViewInit, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-client-read',
  templateUrl: './client-read.component.html',
  styleUrls: ['./client-read.component.css']
})
export class ClientReadComponent implements AfterViewInit {

  clients : Client[] = [];


  displayedColumns: string[] = ['id', 'name', 'cpf', 'telephone', 'action'];
  dataSource = new MatTableDataSource<Client>(this.clients);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service : ClientService,
    private router: Router) { }

  ngAfterViewInit() {
    this.findAll();
  }

  findAll() : void {
    this.service.findAll().subscribe((response) => {
      this.clients = response;
      this.dataSource = new MatTableDataSource<Client>(this.clients);
      this.dataSource.paginator = this.paginator;
    })
  }

  navigateToCreate(): void {
    this.router.navigate(['clients/create'])
  }
}