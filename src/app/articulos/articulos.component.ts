import { Component, OnInit } from '@angular/core';
import { IArticulo } from './../models/articulo';
import { ServiceLService } from './../services/service-l.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import swal from 'sweetalert2';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css'],
  providers: [MessageService]
})
export class ArticulosComponent implements OnInit {
  public articulos: IArticulo[];
  swalWithBootstrapButtons = swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });
  constructor(private http: HttpClient, private serviceL: ServiceLService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.cargarArticulosRegistrados();
  }

  cargarArticulosRegistrados() {
    this.serviceL.sendGetArticulos().subscribe( (resp) => {
      this.articulos = resp;
    },
    (error) => {
      console.log('ocurrio un error en cargarClientesRegistrados(): ' + Object.values(error));
    });
  }

  public eliminar(id: number) {
    this.swalWithBootstrapButtons.fire({
      title: '¿Esta seguro de eliminar?',
      text: 'No se puede revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        // mandar llamar el servicio
        this.serviceL.sendDeleteCliente(id).subscribe( (resp) => {
          this.messageService.add({ key: 'myKey2', severity: 'success', summary: 'Notificacion',
           detail: 'Bien Hecho. El Articulo ha sido eliminado correctamente.'});
        },
        (error) => {
          this.messageService.add({ key: 'myKey2', severity: 'error', summary: 'Notificacion', detail: 'Error: No fue eliminado.'});
        }
        );
        this.swalWithBootstrapButtons.fire(
          'Eliminado',
          'Fue eliminado',
          'success'
        );
        this.cargarArticulosRegistrados();
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === swal.DismissReason.cancel
      ) {
        this.swalWithBootstrapButtons.fire(
          'Cancelado',
          'Accion cancelada',
          'error'
        );
      }
    });

}
}
