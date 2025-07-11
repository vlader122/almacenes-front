import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ItemService } from '../../service/item.service';
import { Item } from '../../models/item';
import { SelectModule } from 'primeng/select';
import { IftaLabelModule } from 'primeng/iftalabel';
import { Toast } from 'primeng/toast';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Tooltip } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputNumber } from "primeng/inputnumber";
import { CategoriaService } from '../../service/categoria.service';

@Component({
  selector: 'app-item',
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
    InputNumber
],
  standalone: true,
  templateUrl: './item.component.html',
  providers: [MessageService, ConfirmationService]
})
export class ItemComponent implements OnInit{
  item: Item = new Item;
  items: any [] = [];
  itemDialog: boolean = false;
  formulario: FormGroup;
  accion: string ="Nuevo";
  unidadMedidaOptions: any[] = ['KG','UNIDADES','LITROS'];
  categorias: any [] = [];

  constructor(
    private _itemService: ItemService,
    private _messageService: MessageService,
    private _confirmationService: ConfirmationService,
    private _categoriaService: CategoriaService,
    
  ){
    this.formulario = new FormGroup({
      nombre: new FormControl('',[Validators.required]),
      cantidad: new FormControl('',[Validators.required]),
      unidadMedida: new FormControl('',[Validators.required]),
      precio: new FormControl('',[Validators.required]),
      categoriaId: new FormControl('',[Validators.required])
    })
  }
  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(){
    this._itemService.obtenerItem().subscribe( dato =>{
      this.items = dato.datos;
    });
  }

  cargarCategorias(){
    this._categoriaService.obtenerCategoria().subscribe( dato =>{
      this.categorias = dato.datos;
    });
  }

  abrirModal(){
    this.cargarCategorias();    
    this.accion = "Nuevo";
    this.itemDialog = true;
  }

  guardar(){
    this.item.Nombre = this.formulario.value.nombre
    this.item.Cantidad = this.formulario.value.cantidad
    this.item.UnidadMedida = this.formulario.value.unidadMedida
    this.item.Precio = this.formulario.value.precio
    this.item.CategoriaId = this.formulario.value.categoriaId
    console.log(this.item);
    
    if(this.accion == "Actualizar"){
      this._itemService.actualizarItem(this.item).subscribe( dato => {
        this._messageService.add({ severity: 'info', summary: 'Correcto', detail: 'Actualizado Correcto' });
        this.itemDialog = false;
        this.formulario.reset();
        this.cargarDatos();
        this.item=new Item;
      })
    } else {
      this._itemService.guardarItem(this.item).subscribe( dato => {
        this._messageService.add({ severity: 'success', summary: 'Correcto', detail: 'Guardado Correcto' });
        this.itemDialog = false;
        this.formulario.reset();
        this.cargarDatos();
      })
    }
  }

  cancelar(){
    this.itemDialog = false;
    this.formulario.reset();
  }

  editar(item:any){
    this.abrirModal();
    this.accion = "Actualizar";
    this.formulario.patchValue(item);
    this.item.Id=item.id;
  }

  eliminarDialog(id:number) {
        this._confirmationService.confirm({
            message: 'Esta seguero de eliminar el Item?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this._itemService.eliminarItem(id).subscribe( dato => {
                  this.cargarDatos();
                });
                this._messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Item eliminado',
                    life: 3000
                });
            }
        });
    }
}
