import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PersonalService } from '../../service/personal.service';
import { Personal } from '../../models/personal';

@Component({
  selector: 'app-personal',
  imports: [
    ToolbarModule,
    ButtonModule,
    TableModule,
    IconFieldModule,
    InputIcon,
    InputTextModule
  ],
  standalone: true,
  templateUrl: './personal.component.html'
})
export class PersonalComponent {
  personales: Personal [] = [];
  constructor(
    private _personalService: PersonalService
  ){

  }

  cargarDatos(){
    this._personalService.obtenerPersonal().subscribe( dato =>{
      this.personales = dato;
    });
  }
}
