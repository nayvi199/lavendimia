import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { ICliente } from '../models/cliente';
import { ServiceLService } from '../services/service-l.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registrarcliente',
  templateUrl: './registrarcliente.component.html',
  styleUrls: ['./registrarcliente.component.css']
})
export class RegistrarclienteComponent implements OnInit, OnDestroy {
  clientesForm: FormGroup;
  cliente: ICliente;
  clienteNU: ICliente;
  title: string;
  id: number;
  sub: any;
  resp2: any;
  parametros: { nombre: string, RFC: string, ape_paterno: string, ape_materno: string }[];
  rfcAuto: string;
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private serviceL: ServiceLService
    ) { }

  ngOnInit() {
    this.inicializarForm();

    this.sub = this.route.params.subscribe((params) => {
      this.id = params.id;
      console.log('id:' + this.id);
      this.title = this.id ? 'Editar Cliente -' : 'Nuevo Cliente';
      if (this.id) {
        /*this.generosService.obtenerGeneroPorId(this.id).subscribe((result) => {
          this.genero = result;
          this.title += this.genero.nombre;
          this.inicializarFormulario();
        });*/
        this.serviceL.sendGetCliente(this.id).subscribe((resp) => {
          this.cliente = resp[0];
          const resp2 = resp;
          this.resp2 = resp[0];
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
        rfc : new FormControl('', Validators.required),
      }
  );
  }

  registrarCliente() {
    console.log('entro registrar cliente');
  }
  public resetFormulario() {
    this.clientesForm.reset();
  }

  regresar() {
    this.router.navigate(['/clientes']);
  }

  enviar() {
    console.log(this.resp2.nombre);
    /*this.parametros.push({
      nombre: this.resp2.nombre,
      RFC: this.resp2.RFC,
      ape_paterno: this.resp2.ape_paterno,
      ape_materno: this.resp2.ape_materno
    });*/
    /*
    const prueba: { idu_cliente: number, nombre: string, RFC: string, ape_paterno: string, ape_materno: string }[] = [{
      'idu_cliente': 1, 'nombre': 'Naibi Irasema', 'RFC': 'CIIN', 'ape_paterno': 'CHIQUETEE', 'ape_materno': 'Ibarra'
    }];
    */
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
    console.log('Entro a onRegisterSubmit, id: ' + id);
    console.log('contenidoform:' + form);
    if (id != null) {
      console.log('entro a Llamar PUT');
      this.serviceL.sendPutCliente(this.clienteNU).subscribe((resp) => {
        console.log('entro sendPUTCliente' + resp);
        form.reset(); // reset form to empty
        this.regresar();
      });
    } else {
      console.log('entro a Llamar POST');
      this.serviceL.sendPostCliente(this.clienteNU).subscribe((resp) => {
        console.log('entro sendPostCliente' + resp);
        form.reset(); // reset form to empty
        this.regresar();
      });
    }
    /*
    this.serviceL.sendPutCliente(this.clienteNU).subscribe((resp) => {
      console.log('entro sendPutCliente' + resp);
      form.reset(); // reset form to empty
    });*/
  }

  myFunction() {
    console.log('entro a myfuncion');
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
