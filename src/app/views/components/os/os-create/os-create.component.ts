import { Router } from '@angular/router';
import { OsService } from './../../../../services/os.service';
import { OS } from './../../../../models/OS';
import { Client } from './../../../../models/client';
import { ClientService } from './../../../../services/client.service';
import { Technician } from './../../../../models/technician';
import { TechnicianService } from './../../../../services/technician.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-os-create',
  templateUrl: './os-create.component.html',
  styleUrls: ['./os-create.component.css']
})
export class OsCreateComponent implements OnInit {

  os: OS = {
    technician: '',
    client: '',
    comments: '',
    status: '',
    priority: ''
  }

  


  technicians: Technician[] = [];
  clients: Client[] = [];

  constructor(private technicianService: TechnicianService,
    private clientService: ClientService,
    private osService: OsService,
    private router: Router) { }

  ngOnInit(): void {
    this.listTechnicians();
    this.listClients();
  }

  create(): void {
    this.osService.create(this.os).subscribe(response => {
      this.osService.message("Ordem de Serviço criada com sucesso!");
      this.router.navigate(['os']);
    })
  }

  cancel(): void {
    this.router.navigate(['os']);
  }

  listTechnicians():void {
    this.technicianService.findAll().subscribe(response => {
      this.technicians = response;
    })
  }

  listClients():void {
    this.clientService.findAll().subscribe(response => {
      this.clients = response;
    })
  }

}
