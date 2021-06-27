import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-update',
  templateUrl: './client-update.component.html',
  styleUrls: ['./client-update.component.css']
})
export class ClientUpdateComponent implements OnInit {

  id_cli = '';

  client: Client = {
    id: '',
    name: '',
    cpf: '',
    telephone: ''
  }

  name =  new FormControl ('', [Validators.minLength(5)])
  cpf = new FormControl('', [Validators.minLength(11)])
  telephone = new FormControl('', [Validators.minLength(11)])

  constructor(
    private router: Router, 
    private clientService: ClientService,
    private route: ActivatedRoute) { }

  ngOnInit():void {
    this.id_cli = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }

  cancel():void {
    this.router.navigate(['clients'])
  }

  update(): void {
    this.clientService.update(this.client).subscribe((response) => {
      this.router.navigate(['clients'])
      this.clientService.message('Cliente atualizado com sucesso!')
    }, err => {
      if(err.error.error.match('already exists')) {
        this.clientService.message(err.error.error);
      } else if (err.error.errors[0].message === "número do registro de contribuinte individual brasileiro (CPF) inválido") {
        this.clientService.message('CPF inválido!');
      }
    })
  }

  findById(): void {
    this.clientService.findById(this.id_cli).subscribe(response => {
      this.client = response;
    })
  }

  errorValidName() {
    if(this.name.invalid) {
      return 'O nome deve ter entre 5 e 100 caracteres!';
    }
    return false;
  }

  errorValidCPF() {
    if(this.cpf.invalid) {
      return 'O CPF deve ter entre 11 e 15 caracteres!';
    }
    return false;
  }

  errorValidTelephone() {
    if(this.telephone.invalid) {
      return 'O telefone deve ter entre  11 e 18 caracteres!';
    }
    return false;
  }
}
