import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { CategoriaService } from '../../service/categoria.service';
import { Categoria } from '../../models/categoria';
import { SelectModule } from 'primeng/select';
import { IftaLabelModule } from 'primeng/iftalabel';
import { Toast } from 'primeng/toast';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Tooltip } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-categoria',
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
  templateUrl: './categoria.component.html',
  providers: [MessageService, ConfirmationService]
})
export class CategoriaComponent implements OnInit{
  categoria: Categoria = new Categoria;
  categorias: any [] = [];
  categoriaDialog: boolean = false;
  formulario: FormGroup;
  accion: string ="Nuevo";
  constructor(
    private _categoriaService: CategoriaService,
    private _messageService: MessageService,
    private _confirmationService: ConfirmationService
  ){
    this.formulario = new FormGroup({
      descripcion: new FormControl('',[Validators.required]),
    })
  }
  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(){
    this._categoriaService.obtenerCategoria().subscribe( dato =>{
      this.categorias = dato.datos;
    });
  }

  abrirModal(){
    this.accion = "Nuevo";
    this.categoriaDialog = true;
  }

  guardar(){
    this.categoria.Descripcion = this.formulario.value.descripcion;

    if(this.accion == "Actualizar"){
      this._categoriaService.actualizarCategoria(this.categoria).subscribe( dato => {
        this._messageService.add({ severity: 'info', summary: 'Correcto', detail: 'Actualizado Correcto' });
        this.categoriaDialog = false;
        this.formulario.reset();
        this.cargarDatos();
        this.categoria=new Categoria;
      })
    } else {
      this._categoriaService.guardarCategoria(this.categoria).subscribe( dato => {
        this._messageService.add({ severity: 'success', summary: 'Correcto', detail: 'Guardado Correcto' });
        this.categoriaDialog = false;
        this.formulario.reset();
        this.cargarDatos();
      })
    }
  }

  cancelar(){
    this.categoriaDialog = false;
    this.formulario.reset();
  }

  editar(categoria:any){
    this.abrirModal();
    this.accion = "Actualizar";
    this.formulario.patchValue(categoria);
    this.categoria.Id=categoria.id;
  }

  eliminarDialog(id:number) {
        this._confirmationService.confirm({
            message: 'Esta seguero de eliminar el Categoria?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this._categoriaService.eliminarCategoria(id).subscribe( dato => {
                  this.cargarDatos();
                });
                this._messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Categoria eliminado',
                    life: 3000
                });
            }
        });
    }
}
