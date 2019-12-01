import { IVenta } from './../models/venta';
import { ServiceLService } from './../services/service-l.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
  constructor(private http: HttpClient, private serviceL: ServiceLService) { }

  ngOnInit() {
    this.cargarVentasRegistradas();
  }

  cargarVentasRegistradas() {
    this.serviceL.sendGetVentas().subscribe( (resp) => {
      this.ventas = resp;
      console.log('ventas' + this.ventas);
   },
   (error) => {
    console.log('ocurrio un error' + error);
   }
   );
  }

  agregarVenta() {
    console.log('entro a venta');
  }

}
