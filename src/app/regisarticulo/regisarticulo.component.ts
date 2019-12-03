import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { IArticulo } from '../models/articulo';
import { HttpClient } from '@angular/common/http';
import { stringify } from 'querystring';
import {MessageService} from 'primeng/api';
import {Message} from 'primeng//api';
import { Subscription } from 'rxjs';
import { ArticuloServiceService } from '../services/articulo-service.service';

@Component({
  selector: 'app-regisarticulo',
  templateUrl: './regisarticulo.component.html',
  styleUrls: ['./regisarticulo.component.css'],
  providers: [MessageService]
})
export class RegisarticuloComponent implements OnInit, OnDestroy {
  title: string;
  id: number;
  sub: any;
  articulosForm: FormGroup;
  articulo: IArticulo;
  articuloNU: IArticulo;
  nuevoregistro = 0;
  validar = false;
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private serviceL: ArticuloServiceService,
              private messageService: MessageService
  ) { }

  ngOnInit() {
    this.inicializarForm();
    this.sub = this.route.params.subscribe((params) => {
      this.id = params.id;
      this.title = this.id ? 'Editar Articulo' : 'Nuevo Articulo';
      if (this.id) {
        this.serviceL.sendGetArticulo(this.id).subscribe((resp) => {
          this.articulo = resp[0];
          console.log('resp1' + this.articulo);
          console.log(Object.keys(resp));
          console.log(Object.values(this.articulo));
          this.inicializarFormulario();
          },
          (error) => {
            console.log('ocurrio un error en sendGetArticulo(): ' + error);
           }
          );
      } else {
        this.obtenerNumeroRegistrar();
      }
    });
  }
  inicializarForm() {
    this.articulosForm = this.fb.group(
      {
        id: {value: null, disabled: true},
        desc_articulo : new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]')] ),
        desc_modelo : new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
        imp_precio : new FormControl('', Validators.required),
        num_cantidad : new FormControl( '', Validators.required ),
      }
  );
  }

  public resetFormulario() {
    this.articulosForm.reset();
  }
  obtenerNumeroRegistrar() {
    this.serviceL.sendGetFolioArticuloU().subscribe((resp) => {
      this.nuevoregistro = (resp.id_articulo);
      this.nuevoregistro++;
      console.log('nuevo registro' + this.nuevoregistro);
    });
  }

  inicializarFormulario() {
    this.articulosForm.setValue({
      id: this.id ? this.id : null,
      desc_articulo: this.articulo.desc_articulo,
      desc_modelo: this.articulo.desc_modelo,
      imp_precio: this.articulo.imp_precio,
      num_cantidad: this.articulo.num_cantidad
    });
  }

  regresar() {
    if (confirm('Desea salir de la pantalla actual?')) {
    this.router.navigate(['/articulos']);
    }
  }

  onRegisterSubmit(form) {
    const id = form.getRawValue().id;
    // Insertar datos nuevos a Interfaz
    this.articuloNU = { idu_articulo: id,
                        desc_articulo: form.getRawValue().desc_articulo,
                        desc_modelo: form.getRawValue().desc_modelo,
                        imp_precio: form.getRawValue().imp_precio,
                        num_cantidad: form.getRawValue().num_cantidad};
    if (id != null) {
      this.serviceL.sendPutArticulo(this.articuloNU).subscribe((resp) => {
       // Bien Hecho. El Articulo ha sido registrado correctamente
       this.messageService.add({ key: 'myKey3', severity: 'success', summary: 'Notificacion',
       detail: 'Bien Hecho. El Articulo ha sido actualizado correctamente'});
       form.reset(); // reset formulario
       // setTimeout(() => { }, 5000);
       this.validar = true;
     });
    } else {
      this.serviceL.sendPostArticulo(this.articuloNU).subscribe((resp) => {
        this.messageService.add({ key: 'myKey3', severity: 'success', summary: 'Notificacion',
        detail: 'Bien Hecho. El Articulo ha sido registrado correctamente'});
        form.reset(); // reset formulario
        this.validar = true;
      });
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }



}
