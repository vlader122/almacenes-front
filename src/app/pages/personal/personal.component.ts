import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PersonalService } from '../../service/personal.service';
import { Personal } from '../../models/personal';
import { SelectModule } from 'primeng/select';
import { IftaLabelModule } from 'primeng/iftalabel';
import { Toast } from 'primeng/toast';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Tooltip } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-personal',
  imports: [
    DialogModule,
    ToolbarModule,
    ButtonModule,
    TableModule,
    IconFieldModule,
    InputIcon,
    InputTextModule,
    SelectModule,
    ReactiveFormsModule,
    IftaLabelModule,
    Toast,
    Tooltip,
    ConfirmDialogModule
  ],
  standalone: true,
  templateUrl: './personal.component.html',
  providers: [MessageService, ConfirmationService]
})
export class PersonalComponent implements OnInit{
  personal: Personal = new Personal;
  personales: any [] = [];
  personalDialog: boolean = false;
  formulario: FormGroup;
  accion: string ="Nuevo";
  constructor(
    private _personalService: PersonalService,
    private _messageService: MessageService,
    private _confirmationService: ConfirmationService
  ){
    this.formulario = new FormGroup({
      nombre: new FormControl('',[Validators.required]),
      apellido: new FormControl('',[Validators.required]),
      direccion: new FormControl('',[Validators.required]),
      telefono: new FormControl('',[Validators.required]),
      codigoPostal: new FormControl('',[Validators.required]),
    })
  }
  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(){
    this._personalService.obtenerPersonal().subscribe( dato =>{
      this.personales = dato.datos;
    });
  }

  abrirModal(){
    this.accion = "Nuevo";
    this.personalDialog = true;
  }

  guardar(){
    this.personal.Nombre = this.formulario.value.nombre;
    this.personal.Apellido = this.formulario.value.apellido;
    this.personal.Direccion = this.formulario.value.direccion;
    this.personal.Telefono = this.formulario.value.telefono;
    this.personal.CodigoPostal = this.formulario.value.codigoPostal;

    if(this.accion == "Actualizar"){
      this._personalService.actualizarPersonal(this.personal).subscribe( dato => {
        this._messageService.add({ severity: 'info', summary: 'Correcto', detail: 'Actualizado Correcto' });
        this.personalDialog = false;
        this.formulario.reset();
        this.cargarDatos();
        this.personal=new Personal;
      })
    } else {
      this._personalService.guardarPersonal(this.personal).subscribe( dato => {
        this._messageService.add({ severity: 'success', summary: 'Correcto', detail: 'Guardado Correcto' });
        this.personalDialog = false;
        this.formulario.reset();
        this.cargarDatos();
      })
    }
  }

  cancelar(){
    this.personalDialog = false;
    this.formulario.reset();
  }

  editar(personal:any){
    this.abrirModal();
    this.accion = "Actualizar";
    this.formulario.patchValue(personal);
    this.personal.Id=personal.id;
  }

  eliminarDialog(id:number) {
        this._confirmationService.confirm({
            message: 'Esta seguero de eliminar el Personal?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this._personalService.eliminarPersonal(id).subscribe( dato => {
                  this.cargarDatos();
                });
                this._messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Personal eliminado',
                    life: 3000
                });
            }
        });
    }
}
