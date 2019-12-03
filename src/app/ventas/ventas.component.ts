import { IVenta } from './../models/venta';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VentaServiceService } from '../services/venta-service.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  public ventas: IVenta [];
  /*public ventas = [
    {
        idu_folio: 1,
        idu_cliente: 1,
        imp_total: 1000,
        num_fecha: 'nov 26, 2019',
        idu_estatus: 1
    }
  ];*/
  constructor(private http: HttpClient, private serviceL: VentaServiceService) { }

  ngOnInit() {
    // this.cargarVentasRegistrados();
  }

  /*
  cargarVentasRegistrados() {
    this.serviceL.sendGetVentas().subscribe( (resp) => {
      this.ventas = resp;
      console.log('ventas');
   },
   (error) => {
    console.log('ocurrio un error en cargarVentasRegistrados(): ' + error);
   });
  }

  agregarVenta() {
    console.log('entro a venta');
  }
  */
}
