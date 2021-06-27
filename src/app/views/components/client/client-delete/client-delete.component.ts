import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-client-delete',
  templateUrl: './client-delete.component.html',
  styleUrls: ['./client-delete.component.css']
})
export class ClientDeleteComponent implements OnInit {

  id_cli = '';

  client: Client = {
    id: '',
    name: '',
    cpf: '',
    telephone: ''
  }

  constructor(
    private router: Router, 
    private clientService: ClientService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id_cli = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }


  findById(): void {
    this.clientService.findById(this.id_cli).subscribe(response => {
      this.client = response;
    })
  }

  delete():void {
    this.clientService.delete(this.id_cli).subscribe((response) => {
      this.router.navigate(['clients']);
      this.clientService.message('Cliente deletado com sucesso!');
    }, err => {
      if(err.error.error.match('Client has work orders')) {
        this.clientService.message('O cliente possui ordens de serviço, não pode ser excluído!')
      }
    })
  }

  cancel():void {
    this.router.navigate(['clients'])
  }

}

