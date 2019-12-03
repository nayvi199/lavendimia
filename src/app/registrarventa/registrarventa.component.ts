import { Component, OnInit, ViewChild, ElementRef, ɵSWITCH_IVY_ENABLED__POST_R3__ } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ConfiguracionServiceService } from '../services/configuracion-service.service';
import {VentaServiceService} from '../services/venta-service.service';
import {ClientesServiceService} from '../services/clientes-service.service';
import {ArticuloServiceService} from '../services/articulo-service.service';
import {Observable} from 'rxjs';
import {map, startWith, filter} from 'rxjs/operators';
import { ICliente } from '../models/cliente';
import { IConfiguracion } from '../models/configuracion';
import { IArticulo } from '../models/articulo';
import { IAbono } from '../models/abonos';
import { IVenta } from '../models/venta';
import { ActivatedRoute, Router } from '@angular/router';
import {MessageService} from 'primeng/api';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-registrarventa',
  templateUrl: './registrarventa.component.html',
  styleUrls: ['./registrarventa.component.css'],
  providers: [MessageService]
})
export class RegistrarventaComponent implements OnInit {

  folio: number;
  productos = [];
  abonosMensuales = [];
  showPlazos: boolean;
  enganche: number;
  bonificacionEnganche: number;
  total: number;
  clientes = [];
  articulos = [];
  filteredArticulos: Observable<string[]>;
  filteredClientes: Observable<string[]>;
  clienteFormControl = new FormControl();
  articuloFormControl = new FormControl();
  cliente: ICliente;
  configuracion: IConfiguracion;
  articulo: IArticulo;
  abono: IAbono;
  venta: IVenta;
  @ViewChild('nombreCliente', {static: true}) nombreCliente: ElementRef;
  @ViewChild('nombreArticulo', {static: true}) nombreArticulo: ElementRef;

  constructor( private configuracionServices: ConfiguracionServiceService,
               private ventasServices: VentaServiceService,
               private clientesService: ClientesServiceService,
               private articulosService: ArticuloServiceService,
               private messageService: MessageService,
               private route: ActivatedRoute,
               private router: Router) {

      this.enganche = 0;
      this.bonificacionEnganche = 0;
      this.total = 0;
      this.showPlazos = false;
    }

  ngOnInit() {
    this.configuracionServices.sendGetConfiguracion().subscribe(resp=>{
      this.configuracion=resp;
    });
    this.ventasServices.sendGetFolioVentaU().subscribe(resp=>{
      this.folio= resp.id_venta;
    });
    this.clientesService.sendGetClientes().subscribe(resp=>{
      this.clientes=resp;
    });
    this.articulosService.sendGetArticulos().subscribe(resp=>{
      this.articulos=resp;
    });

    this.filteredClientes = this.clienteFormControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterClientes(value))
      );

    this.filteredArticulos = this.articuloFormControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterArticulos(value))
      );
  }
  private _filterClientes(value: string): string[] {
    const filterValue = value.toLowerCase();
    
    if(filterValue.length>2 && filterValue !== ""){
      return this.clientes.filter(cliente => {
        let nombreCLiente= cliente.nombre+' '+cliente.ape_paterno+' '+cliente.ape_materno;
        if(nombreCLiente.toLowerCase().includes(filterValue)){
          cliente.nombreCompleto =nombreCLiente;
          return cliente;
        }
      }
      );
    }
    else{
      if(this.cliente && this.nombreCliente.nativeElement.value==""){
        this.cliente.RFC="";
      }
    }
    
  }
  private _filterArticulos(value: string): string[] {
    const filterValue = value.toLowerCase();
    
    if(filterValue.length>2 && filterValue !== ""){
      return this.articulos.filter(articulo => { 
        if(articulo.desc_articulo.toLowerCase().includes(filterValue)){
          return articulo;
        }
      }
      );
    }
  }

  getCliente(cliente){
    this.cliente=cliente;
    this.nombreCliente.nativeElement.value=cliente.nombreCompleto;
    this.filteredClientes = this.clienteFormControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterClientes(value))
      );
  }
  getArticulo(articulo){
    this.articulo=articulo;
    this.nombreArticulo.nativeElement.value=articulo.desc_articulo;
    this.filteredArticulos = this.articuloFormControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterArticulos(value))
      );
  }
  hasProp(o,name){
    if(typeof o !== 'undefined' && o.hasOwnProperty(name)){
      return true;
    }
    return false;
  }
  agregar(){
    if(this.articulo.num_cantidad>1){
      let articulo ={cantidad:1,importe:this.articulo.imp_precio,articulo:this.articulo}
      this.productos.push(articulo);
      this.calcularTotales();
      if(this.showPlazos){
        this.siguiente();
        this.calcularAbonos();
      }
      
    }
    else{
      alert("Lo sentimos, el articulo "+this.articulo.desc_articulo+" no cuenta con existencia, favor de verificar");
    }
    this.nombreArticulo.nativeElement.value="";
    this.articulo=null;
    
  }
  eliminar(index){
    this.productos.splice(index,1);
    this.calcularTotales();
  }
  calculaImporte(index){
    let producto=this.productos[index];
    if(producto.cantidad<1){
      alert("No se permiten cantidades menores a cero, el valor minimo es 1");
      producto.cantidad=1;
    }
    if(producto.cantidad>producto.articulo.num_cantidad){
      alert("La existencia maxima de "+producto.articulo.desc_articulo + " es de: "+producto.articulo.num_cantidad);
      producto.cantidad=producto.articulo.num_cantidad;
    }
    producto.importe= producto.articulo.imp_precio * producto.cantidad;
    this.calcularTotales();
  }

  calcularTotales(){
    let total=0;

    this.productos.forEach(function(element){
      total += element.importe;
    });
    // enganche = (porcentaje de enganche/100) * importe
    this.enganche = parseFloat(((this.configuracion.num_porcEngance/100) * total).toFixed(2));
   // Bonificación Enganche = Enganche x ((tasa financiamiento x Plazo máximo)/100)
   this.bonificacionEnganche= parseFloat((this.enganche * ((this.configuracion.num_tasaFin*this.configuracion.num_plazoMax)/100)).toFixed(2));
   this.total= parseFloat((total - this.enganche -this.bonificacionEnganche).toFixed(2));
   
  }
  siguiente(){
    if(this.cliente && this.productos.length>0)
    {
      this.showPlazos=true;
      this.calcularAbonos();
    }
    else{
      this.showPlazos=false;
      alert("Los datos ingresados no son correctos,favor de verificar");
    }
  }
  calcularAbonos(){
    let numAbonosMensuales=[3,6,9,12];
    let num_tasaFin= this.configuracion.num_tasaFin;
    let total=this.total;
    let abonosMensuales= [];
    let precioContado= this.total/(1+(num_tasaFin*this.configuracion.num_plazoMax)/100);
    numAbonosMensuales.forEach(function(elem){
      let abono= new IAbono();
      abono.imp_totalPagar = precioContado * (1+(num_tasaFin*elem)/100);
      abono.num_meses = elem;
      abono.imp_abono = abono.imp_totalPagar/elem;
      abono.imp_ahorro = total - abono.imp_totalPagar;
      abonosMensuales.push(abono);
    });
    this.abonosMensuales=abonosMensuales;
  }
  guardaAbono(abono) {
    this.abono =  abono;
  }
  guardarVenta() {
    if (this.abono) {
      this.venta = { idu_folio: 0, idu_cliente: this.cliente.idu_cliente,
         nom_cliente: this.cliente.nombre,
         imp_total: this.abono.imp_totalPagar,
         num_fecha: null ,
         idu_estatus: 1};
      console.log(this.venta);
      console.log(this.venta);
      this.ventasServices.sendPostVenta(this.venta).subscribe((resp) => {
        this.messageService.add({ key: 'myKey3', severity: 'success', summary: 'Notificacion',
        detail: 'Bien Hecho. Tu venta a sido registrada correctamente'});
      });
      this.regresar();
    } else {
      alert('Debe seleccionar un plazo para poder realizar su compra');
    }
  }

  regresar() {
    if (confirm('Desea salir de la pantalla actual?')) {
    this.router.navigate(['/ventas']);
    }
  }
}
