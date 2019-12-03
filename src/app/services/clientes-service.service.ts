import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesServiceService {

  constructor(private httpClient: HttpClient) { }

  public sendGetClientes(): Observable<any> {
    console.log('entro a sendGetClientes');
    return this.httpClient.get('/RESTful/webresources/generic/all');
  }

  public sendGetCliente(id: number, parametros?: any): Observable<any> {
    console.log('entro a sendGetCliente');
    return this.httpClient.get('/RESTful/webresources/generic/all/' + id, {params: parametros});
  }

  public sendPostCliente(cliente: ICliente): Observable<any> {
    if (cliente.idu_cliente == null) {
      cliente.idu_cliente = 0;
    }
    console.log('entro a sendPostCliente' + cliente.RFC);
    return this.httpClient.post('/RESTful/webresources/generic/add/', cliente);
  }

  public sendPutCliente(cliente: ICliente): Observable<any> {
    return this.httpClient.put('/RESTful/webresources/generic/', cliente);
  }

  public sendDeleteCliente(id: number): Observable<any> {
    return this.httpClient.delete('/RESTful/webresources/generic/' + id);
  }

  // ultimo folio
  public sendGetFolioClienteU(): Observable<any> {
    return this.httpClient.get('/RESTful/webresources/generic/last');
  }

}
