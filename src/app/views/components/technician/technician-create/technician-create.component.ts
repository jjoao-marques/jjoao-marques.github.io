import { Technician } from './../../../../models/technician';
import { TechnicianService } from './../../../../services/technician.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-technician-create',
  templateUrl: './technician-create.component.html',
  styleUrls: ['./technician-create.component.css']
})
export class TechnicianCreateComponent implements OnInit {

  technician: Technician = {
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
    private technicianService: TechnicianService) { }

  ngOnInit():void {
  }

  cancel():void {
    this.router.navigate(['technicians'])
  }

  create(): void {
    this.technicianService.create(this.technician).subscribe((response) => {
      this.router.navigate(['technicians'])
      this.technicianService.message('Tecnico criado com sucesso!')
    }, err => {
      if(err.error.error.match('already exists')) {
        this.technicianService.message(err.error.error);
      } else if (err.error.errors[0].message === "número do registro de contribuinte individual brasileiro (CPF) inválido") {
        this.technicianService.message('CPF inválido!');
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
