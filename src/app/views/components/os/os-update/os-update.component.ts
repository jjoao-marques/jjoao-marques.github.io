import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { OS } from 'src/app/models/OS';
import { Technician } from 'src/app/models/technician';
import { ClientService } from 'src/app/services/client.service';
import { OsService } from 'src/app/services/os.service';
import { TechnicianService } from 'src/app/services/technician.service';

@Component({
  selector: 'app-os-update',
  templateUrl: './os-update.component.html',
  styleUrls: ['./os-update.component.css']
})
export class OsUpdateComponent implements OnInit {

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
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.os.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.findById();
    this.listTechnicians();
    this.listClients();
  }

  findById():void {
    this.osService.findById(this.os.id).subscribe(response => {
      this.os = response;
    })
  }

  update(): void {
    console.log(this.os)
    this.osService.update(this.os).subscribe(response => {
      this.osService.message("Ordem de Serviço atualizada com sucesso!");
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
