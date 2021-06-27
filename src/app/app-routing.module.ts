import { OsClosedComponent } from './views/components/os/os-closed/os-closed.component';
import { OsViewComponent } from './views/components/os/os-view/os-view.component';
import { OsUpdateComponent } from './views/components/os/os-update/os-update.component';
import { OsCreateComponent } from './views/components/os/os-create/os-create.component';
import { ClientDeleteComponent } from './views/components/client/client-delete/client-delete.component';
import { ClientUpdateComponent } from './views/components/client/client-update/client-update.component';
import { ClientReadComponent } from './views/components/client/client-read/client-read.component';
import { TechnicianDeleteComponent } from './views/components/technician/technician-delete/technician-delete.component';
import { TechnicianUpdateComponent } from './views/components/technician/technician-update/technician-update.component';
import { TechnicianCreateComponent } from './views/components/technician/technician-create/technician-create.component';
import { HomeComponent } from './views/components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TechnicianReadComponent } from './views/components/technician/technician-read/technician-read.component';
import { ClientCreateComponent } from './views/components/client/client-create/client-create.component';
import { OsReadComponent } from './views/components/os/os-read/os-read.component';

const routes: Routes = [
  
  { path: '', component: HomeComponent },
  { path: 'technicians', component: TechnicianReadComponent},
  { path: 'technicians/create', component: TechnicianCreateComponent },
  { path: 'technicians/update/:id', component: TechnicianUpdateComponent},
  { path: 'technicians/delete/:id', component: TechnicianDeleteComponent},
  
  { path: 'clients', component: ClientReadComponent},
  { path: 'clients/create', component: ClientCreateComponent},
  { path: 'clients/update/:id', component: ClientUpdateComponent},
  { path: 'clients/delete/:id', component: ClientDeleteComponent},

  { path: 'os', component: OsReadComponent },
  { path: 'os/create', component: OsCreateComponent},
  { path: 'os/update/:id', component: OsUpdateComponent},
  { path: 'os/view/:id', component: OsViewComponent},
  { path: 'os/closed', component: OsClosedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
