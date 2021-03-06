import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { ICliente } from '../models/cliente';
import { HttpClient } from '@angular/common/http';
import { stringify } from 'querystring';
import {MessageService} from 'primeng/api';
import {Message} from 'primeng//api';
import { ClientesServiceService } from '../services/clientes-service.service';

@Component({
  selector: 'app-registrarcliente',
  templateUrl: './registrarcliente.component.html',
  styleUrls: ['./registrarcliente.component.css'],
  providers: [MessageService]
})
export class RegistrarclienteComponent implements OnInit, OnDestroy {
  [x: string]: any;
  clientesForm: FormGroup;
  cliente: ICliente;
  clienteNU: ICliente;
  title: string;
  id: number;
  sub: any;
  resp2: any;
  fechaRandom: string;
  parametros: { nombre: string, RFC: string, ape_paterno: string, ape_materno: string }[];
  rfcAuto: string;
  msgs: { severity: string, summary: string, detail: string} [];
  // msgs = 'Bien Hecho, se ha ACTUALIZADO con exito.';
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private serviceL: ClientesServiceService,
              private messageService: MessageService
    ) { }

  ngOnInit() {
    this.inicializarForm();
    this.sub = this.route.params.subscribe((params) => {
      this.id = params.id;
      this.title = this.id ? 'Editar Cliente -' : 'Nuevo Cliente';
      if (this.id) {
        /*this.generosService.obtenerGeneroPorId(this.id).subscribe((result) => {
          this.genero = result;
          this.title += this.genero.nombre;
          this.inicializarFormulario();
        });*/
        this.serviceL.sendGetCliente(this.id).subscribe((resp) => {
          this.cliente = resp[0];
          console.log('resp1' + this.cliente);
          console.log(Object.keys(resp));
          console.log(Object.values(this.cliente));
          this.inicializarFormulario();
          },
          (error) => {
            console.log('ocurrio un error en sendGetCliente(): ' + error);
           }
          );
      }
    });
  }

  inicializarForm() {
    this.clientesForm = this.fb.group(
      {
        id: {value: null, disabled: true},
        nom_cliente : new FormControl('', Validators.required ),
        ape_paterno : new FormControl('', Validators.required),
        ape_materno : new FormControl('', Validators.required),
        rfc : new FormControl({value: '', disabled: true}, Validators.required),
      }
  );
  }

  public resetFormulario() {
    this.fechaRandom = '';
    this.clientesForm.reset();
  }

  regresar() {
    if (confirm('Desea salir de la pantalla actual?')) {
    this.router.navigate(['/clientes']);
    }
  }

  enviar() {
    console.log(this.resp2.nombre);
  }

  onRegisterSubmit(form) {
    // since field is disabled, we need to use 'getRawValue'
    const id = form.getRawValue().id;
    // Insertar datos nuevos a Interfaz
    this.clienteNU = {idu_cliente: id,
                      nombre: form.getRawValue().nom_cliente,
                      ape_paterno: form.getRawValue().ape_paterno,
                      ape_materno: form.getRawValue().ape_materno,
                      RFC: form.getRawValue().rfc };
    if (id != null) {
      console.log('entro a Llamar PUT');
      this.serviceL.sendPutCliente(this.clienteNU).subscribe((resp) => {
        this.messageService.add({ key: 'myKey3', severity: 'success', summary: 'Notificacion',
        detail: 'Bien Hecho. El cliente ha sido actualizado correctamente'});
        this.showSuccess();
        form.reset(); // reset formulario
        setTimeout(() => { }, 5000);
        this.regresar();
      });
    } else {
      console.log('entro a Llamar POST');
      this.serviceL.sendPostCliente(this.clienteNU).subscribe((resp) => {
        this.messageService.add({ key: 'myKey3', severity: 'success', summary: 'Notificacion',
        detail: 'Bien Hecho. El cliente ha sido registrado correctamente'});
        form.reset(); // reset formulario
        setTimeout(() => { }, 5000);
        this.regresar();
      });
    }
    /*
    this.serviceL.sendPutCliente(this.clienteNU).subscribe((resp) => {
      console.log('entro sendPutCliente' + resp);
      form.reset(); // reset form to empty
    });*/
  }

  showSuccess() {
    this.msgs.push({severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks'});
    // this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
}

  /*Forma de Llamarse
  <input type="text" formControlName="ape_paterno" class="form-control" name="ape_paterno"
  placeholder="Ingrese Apellido Paterno:" (ngModelChange)="onChangeServicio($event)"/>
  */

  autoCompletarRFC() {
    let nom = (this.clientesForm.getRawValue().nom_cliente);
    let apeP = (this.clientesForm.getRawValue().ape_paterno);
    let apeM = (this.clientesForm.getRawValue().ape_materno);
    if (nom == null || apeP == null || apeM == null) {
      this.clientesForm.controls.rfc.setValue('');
      this.rfcAuto = '';
      this.fechaRandom = '';
    }

    if (nom != null && apeP != null && apeM != null) {
      nom = nom.toUpperCase();
      apeP = apeP.toUpperCase();
      apeM = apeM.toUpperCase();
       // Buscar primero vocal en apellido
      let i1 = (apeP.indexOf('A'));
      let i2 = (apeP.indexOf('E'));
      let i3 = (apeP.indexOf('I'));
      let i4 = (apeP.indexOf('O'));
      let i5 = (apeP.indexOf('U'));
       /*console.log('i1: ' + i1);
       console.log('i2: ' + i2);
       console.log('i3: ' + i3);
       console.log('i5: ' + i4);
       console.log('i5: ' + i5);*/
       if (i1 == -1 || i1 == 0) {
        i1 = 20;
       }
      if (i2 == -1 || i2 == 0) {
        i2 = 20;
       }
      if (i3 == -1 || i3 == 0) {
        i3 = 20;
       }
      if (i4 == -1 || i4 == 0) {
        i4 = 20;
       }
      if (i5 == -1 || i5 == 0) {
        i5 = 20;
       }
      let indice = Math.min(i1, i2, i3, i4, i5);
      if ( indice == -1) {
           indice = 1;
       }
      this.generarFechaAleatoria();
      this.rfcAuto = ((apeP.charAt(0) + apeP.charAt(indice)) + (apeM.charAt(0)) + (nom.charAt(0)) ) + this.fechaRandom;
      this.clientesForm.controls.rfc.setValue(this.rfcAuto);
    }
  }

  generarFechaAleatoria() {
      let anio;
      let mes;
      let dia;
      anio = Math.round(Math.random() * (2019 - 1980) + 1980);
      mes = Math.round(Math.random() * (12 - 10) + 10);
      dia = Math.round(Math.random() * (30 - 10) + 10);
      this.fechaRandom = (anio.toString().charAt(2) + anio.toString().charAt(3)) + (mes.toString()) + (dia.toString());
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  inicializarFormulario() {
    this.clientesForm.setValue({
      id: this.id ? this.id : null,
      nom_cliente: this.cliente.nombre,
      ape_paterno: this.cliente.ape_paterno,
      ape_materno: this.cliente.ape_materno,
      rfc: this.cliente.RFC,
    });
  }
}
