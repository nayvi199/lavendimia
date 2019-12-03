import { IVenta } from './../models/venta';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VentaServiceService } from '../services/venta-service.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css'],
  providers: [DatePipe]
})
export class VentasComponent implements OnInit {
  public ventas: IVenta [];
  public ventasFinal: { idu_folio: number,
    idu_cliente: number,
    nom_cliente: string,
    imp_total: number,
    num_fecha: string} [] = [];
  /*public ventas = [
    {
        idu_folio: 1,
        idu_cliente: 1,
        imp_total: 1000,
        num_fecha: 'nov 26, 2019',
        idu_estatus: 1
    }
  ];*/
  constructor(private http: HttpClient, private serviceL: VentaServiceService,
              private datePipe: DatePipe) { }

  ngOnInit() {
   this.cargarVentasRegistrados();
  }

  cargarVentasRegistrados() {
    this.serviceL.sendGetVentas().subscribe( (resp) => {
      this.ventas = resp;
      this.ventas.forEach(element => {
        console.log('elemento' + element);
        this.ventasFinal.push( {
          idu_folio: element.idu_folio,
          idu_cliente: element.idu_cliente,
           nom_cliente: element.nom_cliente,
           imp_total: element.imp_total,
            num_fecha: this.datePipe.transform(element.num_fecha, 'dd-MM-yyyy'),
        });
      }
      );
      console.log( this.ventasFinal);
   },
   (error) => {
    console.log('ocurrio un error en cargarVentasRegistrados(): ' + error);
   });
  }
}
