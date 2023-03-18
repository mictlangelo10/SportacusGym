import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InstructoresComponent } from './components/instructores/instructores.component';
import { ClassComponent } from './components/class/class.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'instructores', component: InstructoresComponent},
  {path: 'class', component: ClassComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
