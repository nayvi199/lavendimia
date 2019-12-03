import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import {MessageService } from 'primeng/api';
import { IConfiguracion } from './../models/configuracion';
import { HttpClient } from '@angular/common/http';
import { ConfiguracionServiceService } from '../services/configuracion-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css'],
  providers: [MessageService]
})
export class ConfiguracionComponent implements OnInit {
  tasa = 0;
  enganche = 0;
  plazo = 0;
  configuracion: IConfiguracion;
  disable1 = false;
  disable2 = false;
  disable3 = false;
  disablebutton = false;
  constructor(private http: HttpClient, private serviceL: ConfiguracionServiceService,
              private messageService: MessageService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.cargarConfiguracion();
  }

  cargarConfiguracion() {
    this.serviceL.sendGetConfiguracion().subscribe( (resp) => {
      this.tasa = resp.num_tasaFin;
      this.enganche = resp.num_porcEngance;
      this.plazo = resp.num_plazoMax;
      console.log(resp);
    }, (error) => {
      console.log('ocurrio un error en cargarConfiguracion(): ' + error);
     }
    );

  }

  guardarConfiguracion() {
    this.configuracion = { idu_configuracion: 1, num_tasaFin : this.tasa,
                            num_porcEngance: this.enganche, num_plazoMax: this.plazo };
    this.serviceL.sendPostConfiguracion(this.configuracion).subscribe( (resp) => {
      this.messageService.add({ key: 'myKey2', severity: 'success', summary: 'Notificacion',
      detail: 'Bien Hecho. La configuración ha sido registrada' });
      // desabilitar input una vez guardados
      this.disable1 = true;
      this.disable2 = true;
      this.disable3 = true;
      // inhabilitar boton
      this.disablebutton = false;
    });
  }

  regresar() {
    if (confirm('Desea salir de la pantalla actual?')) {
      this.router.navigate(['/home']);
    }
  }

showConfirm() {
  this.messageService.clear();
  this.messageService.add({key: 'c', sticky: true, severity: 'warn',
  summary: 'Desea salir de la pantalla actual?', detail: 'Confirmar'});
}

}
