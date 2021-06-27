import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Technician } from 'src/app/models/technician';
import { TechnicianService } from 'src/app/services/technician.service';

@Component({
  selector: 'app-technician-delete',
  templateUrl: './technician-delete.component.html',
  styleUrls: ['./technician-delete.component.css']
})
export class TechnicianDeleteComponent implements OnInit {

  id_tec = '';

  technician: Technician = {
    id: '',
    name: '',
    cpf: '',
    telephone: ''
  }

  constructor(
    private router: Router, 
    private technicianService: TechnicianService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id_tec = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }


  findById(): void {
    this.technicianService.findById(this.id_tec).subscribe(response => {
      this.technician = response;
    })
  }

  delete():void {
    this.technicianService.delete(this.id_tec).subscribe((response) => {
      this.router.navigate(['technicians']);
      this.technicianService.message('Técnico deletado com sucesso!');
    }, err => {
      if(err.error.error.match('Client has work orders')) {
        this.technicianService.message('O cliente possui ordens de serviço, não pode ser excluído!')
      }
    })
  }

  cancel():void {
    this.router.navigate(['technicians'])
  }

}
