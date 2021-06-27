import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Technician } from 'src/app/models/technician';
import { TechnicianService } from 'src/app/services/technician.service';

@Component({
  selector: 'app-technician-update',
  templateUrl: './technician-update.component.html',
  styleUrls: ['./technician-update.component.css']
})
export class TechnicianUpdateComponent implements OnInit {

  id_tec = '';

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
    private technicianService: TechnicianService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id_tec = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }

  update(): void {
    this.technicianService.update(this.technician).subscribe((response) => {
      this.router.navigate(['technicians'])
      this.technicianService.message('Técnico atualizado com sucesso!')
    }, err => {
      if(err.error.error.match('already exists')) {
        this.technicianService.message(err.error.error);
      } else if (err.error.errors[0].message === "número do registro de contribuinte individual brasileiro (CPF) inválido") {
        this.technicianService.message('CPF inválido!');
      }
    })
  }

  findById(): void {
    this.technicianService.findById(this.id_tec).subscribe(response => {
      this.technician = response;
    })
  }

  cancel():void {
    this.router.navigate(['technicians'])
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
