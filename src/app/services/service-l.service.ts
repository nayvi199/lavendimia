import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IVenta } from '../models/venta';
import { ICliente } from '../models/cliente';
import { IArticulo } from '../models/articulo';
import { IConfiguracion } from '../models/configuracion';

@Injectable({
  providedIn: 'root'
})
export class ServiceLService {
  // private REST_API_SERVER = 'http://189.186.124.55/RESTful2/webresources';
  constructor(private httpClient: HttpClient) { }

  /*public sendGetVentas(): Observable<any> {
    return this.httpClient.get(this.REST_API_SERVER + '/venta/all');
  }*/
  public sendGetVentas(): Observable<any> {
    return this.httpClient.get('/RESTful/webresources/venta/all');
  }
  public sendGetClientes(): Observable<any> {
    console.log('entro a sendGetClientes');
    return this.httpClient.get('/RESTful/webresources/generic/all');
  }
  public sendGetArticulos(): Observable<any> {
    return this.httpClient.get('/RESTful/webresources/articulo/all');
  }
  public sendGetConfiguracion(): Observable<any> {
    return this.httpClient.get('/RESTful/webresources/confi/all');
  }

  // obtener registros especificos
  public sendGetCliente(id: number, parametros?: any): Observable<any> {
    console.log('entro a sendGetCliente');
    return this.httpClient.get('/RESTful/webresources/generic/all/' + id, {params: parametros});
  }
  public sendGetVenta(id: number, parametros?: any): Observable<any> {
    return this.httpClient.get('/RESTful/webresources/venta/all/' + id, {params: parametros});
  }
  public sendGetConfiguracionC(id: number, parametros?: any): Observable<any> {
    return this.httpClient.get('/RESTful/webresources/confi/all/' + id, {params: parametros});
  }
  public sendGetArticulo(id: number, parametros?: any): Observable<any> {
    return this.httpClient.get('/RESTful/webresources/articulo/all/' + id, {params: parametros});
  }

  // Obtener ultimos agregados
  public sendGetFolioVentaU(): Observable<any> {
    return this.httpClient.get('/RESTful/webresources/venta/last');
  }
  public sendGetFolioClienteU(): Observable<any> {
    return this.httpClient.get('/RESTful/webresources/generic/last');
  }
  public sendGetFolioArticuloU(): Observable<any> {
    return this.httpClient.get('/RESTful/webresources/articulo/last');
  }

  // metodos para agregar
  public sendPostVenta(venta: IVenta): Observable<any> {
    return this.httpClient.post('/RESTful/webresources/venta/add', venta);
  }
  public sendPostCliente(cliente: ICliente): Observable<any> {
    if (cliente.idu_cliente == null) {
      cliente.idu_cliente = 0;
    }
    console.log('entro a sendPostCliente' + cliente.RFC);
    return this.httpClient.post('/RESTful/webresources/generic/add/', cliente);
  }
  public sendPostArticulo(articulo: IArticulo): Observable<any> {
    return this.httpClient.post('/RESTful/webresources/articulo/add/', articulo);
  }

  public sendPostConfiguracion(confi: IConfiguracion): Observable<any> {
    return this.httpClient.post('/RESTful/webresources/confi/add/', confi);
  }

  // metodos modificar
  public sendPutVenta(venta: IVenta): Observable<any> {
    return this.httpClient.put('/RESTful/webresources/venta/', venta);
  }
  public sendPutCliente(cliente: ICliente): Observable<any> {
    return this.httpClient.put('/RESTful/webresources/generic/', cliente);
  }
  public sendPutArticulo(articulo: IArticulo): Observable<any> {
    return this.httpClient.put('/RESTful/webresources/articulo/', articulo);
  }

  public sendPutConfiguracion(confi: IConfiguracion): Observable<any> {
    return this.httpClient.put('/RESTful/webresources/confi/', confi);
  }

  // metodos para eliminar
  public sendDeleteVenta(id: number): Observable<any> {
    return this.httpClient.delete('/RESTful/webresources/venta/' + id);
    // return this.http.get(´${this.apiUrl}/${num_empleado}´);
  }

  public sendDeleteArticulo(id: number): Observable<any> {
    return this.httpClient.delete('/RESTful/webresources/articulo/' + id);
    // return this.http.get(´${this.apiUrl}/${num_empleado}´);
  }

  public sendDeleteConfiguracion(id: number): Observable<any> {
    return this.httpClient.delete('/RESTful/webresources/confi/' + id);
    // return this.http.get(´${this.apiUrl}/${num_empleado}´);
  }

  public sendDeleteCliente(id: number): Observable<any> {
    return this.httpClient.delete('/RESTful/webresources/generic/' + id);
    // return this.http.get(´${this.apiUrl}/${num_empleado}´);
  }


}
