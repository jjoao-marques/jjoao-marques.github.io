import { OsService } from 'src/app/services/os.service';
import { OS } from './../../../../models/OS';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-os-view',
  templateUrl: './os-view.component.html',
  styleUrls: ['./os-view.component.css']
})
export class OsViewComponent implements OnInit {

  os: OS  = {
    technician: '',
    client: '',
    comments: '',
    priority: '',
    status: ''
  }

  constructor(private route: ActivatedRoute, private osService: OsService, private router: Router) { }

  ngOnInit(): void {
    this.os.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.osService.findById(this.os.id).subscribe(response => {
      this.os = response;
    })
  }

  back():void {
    this.router.navigate(['os'])
  }

}
