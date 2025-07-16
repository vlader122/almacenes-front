import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { EntregaService } from '../../service/entrega.service';
import { Entrega } from '../../models/entrega';
import { SelectModule } from 'primeng/select';
import { IftaLabelModule } from 'primeng/iftalabel';
import { Toast } from 'primeng/toast';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Tooltip } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DatePicker } from "primeng/datepicker";
import { InputNumber } from "primeng/inputnumber";
import { TextareaModule } from "primeng/textarea";
import { Personal } from '../../models/personal';
import { PersonalService } from '../../service/personal.service';

@Component({
  selector: 'app-entrega',
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
    ConfirmDialogModule,
    DatePicker,
    InputNumber,
    TextareaModule
],
  standalone: true,
  templateUrl: './entrega.component.html',
  providers: [MessageService, ConfirmationService]
})
export class EntregaComponent implements OnInit{
  entrega: Entrega = new Entrega;
  entregas: any [] = [];
  entregaDialog: boolean = false;
  formulario: FormGroup;
  accion: string ="Nuevo";
  personales: any [] = [];
  constructor(
    private _entregaService: EntregaService,
    private _messageService: MessageService,
    private _confirmationService: ConfirmationService,
    private _personalService: PersonalService
  ){
    this.formulario = new FormGroup({
      fecha: new FormControl('',[Validators.required]),
      cantidad: new FormControl('',[Validators.required]),
      observaciones: new FormControl('',[Validators.required]),
      personalId: new FormControl('',[Validators.required]),

    })
  }
  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(){
    this._entregaService.obtenerEntrega().subscribe( dato =>{
      this.entregas = dato.datos;
    });
  }

  cargarPersonal(){
    this._personalService.obtenerPersonal().subscribe( dato =>{
      this.personales = dato.datos;
    });
  }
  
  abrirModal(){
    this.cargarPersonal();
    this.accion = "Nuevo";
    this.entregaDialog = true;
  }

  guardar(){
    this.entrega.Fecha = this.formulario.value.fecha;
    this.entrega.Cantidad = this.formulario.value.cantidad;
    this.entrega.Observaciones = this.formulario.value.observaciones;
    this.entrega.PersonalId = this.formulario.value.personalId;

    if(this.accion == "Actualizar"){
      this._entregaService.actualizarEntrega(this.entrega).subscribe( dato => {
        this._messageService.add({ severity: 'info', summary: 'Correcto', detail: 'Actualizado Correcto' });
        this.entregaDialog = false;
        this.formulario.reset();
        this.cargarDatos();
        this.entrega=new Entrega;
      })
    } else {
      this._entregaService.guardarEntrega(this.entrega).subscribe( dato => {
        this._messageService.add({ severity: 'success', summary: 'Correcto', detail: 'Guardado Correcto' });
        this.entregaDialog = false;
        this.formulario.reset();
        this.cargarDatos();
      })
    }
  }

  cancelar(){
    this.entregaDialog = false;
    this.formulario.reset();
  }

  editar(entrega:any){
    this.abrirModal();
    this.accion = "Actualizar";
    this.formulario.patchValue(entrega);
    this.entrega.Id=entrega.id;
  }

  eliminarDialog(id:number) {
        this._confirmationService.confirm({
            message: 'Esta seguero de eliminar el Entrega?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this._entregaService.eliminarEntrega(id).subscribe( dato => {
                  this.cargarDatos();
                });
                this._messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Entrega eliminado',
                    life: 3000
                });
            }
        });
    }
}
