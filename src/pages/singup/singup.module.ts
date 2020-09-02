import { EstadoService } from './../../app/services/domain/estado.service';
import { CidadeService } from './../../app/services/domain/cidade.service';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SingupPage } from './singup';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    SingupPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicPageModule.forChild(SingupPage),
  ],
  providers: [
    CidadeService, 
    EstadoService
  ]
})
export class SingupPageModule {}
