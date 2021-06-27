import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css']
})
export class ClientCreateComponent implements OnInit {

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
    private clientService: ClientService) { }

  ngOnInit():void {
  }

  cancel():void {
    this.router.navigate(['clients'])
  }

  create(): void {
    this.clientService.create(this.client).subscribe((response) => {
      this.router.navigate(['clients'])
      this.clientService.message('Cliente criado com sucesso!')
    }, err => {
      if(err.error.error.match('already exists')) {
        this.clientService.message(err.error.error);
      } else if (err.error.errors[0].message === "número do registro de contribuinte individual brasileiro (CPF) inválido") {
        this.clientService.message('CPF inválido!');
      }
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
