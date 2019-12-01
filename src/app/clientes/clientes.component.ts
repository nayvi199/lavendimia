import { ICliente } from './../models/cliente';
import { ServiceLService } from './../services/service-l.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import swal from 'sweetalert2';
import {MessageService} from 'primeng/api';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  providers: [MessageService]
})
export class ClientesComponent implements OnInit {
  public clientes: ICliente[];
  // public Swal= new Swal();
  titularAlerta = '';
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
    this.cargarClientesRegistrados();
  }

  cargarClientesRegistrados() {
    this.serviceL.sendGetClientes().subscribe( (resp) => {
      this.clientes = resp;
      console.log('clientes' + this.clientes);
   },
   (error) => {
    console.log('ocurrio un error en cargarClientesRegistrados(): ' + error);
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
          this.messageService.add({ key: 'myKey2', severity: 'success', summary: 'Notificacion', detail: 'Eliminado con exito.'});
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
