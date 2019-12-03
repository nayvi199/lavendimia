import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IVenta } from '../models/venta';
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

  public sendGetConfiguracion(): Observable<any> {
    return this.httpClient.get('/RESTful/webresources/confi/all');
  }

  // obtener registros especificos
 
  public sendGetVenta(id: number, parametros?: any): Observable<any> {
    return this.httpClient.get('/RESTful/webresources/venta/all/' + id, {params: parametros});
  }
  public sendGetConfiguracionC(id: number, parametros?: any): Observable<any> {
    return this.httpClient.get('/RESTful/webresources/confi/all/' + id, {params: parametros});
  }


  // Obtener ultimos agregados
  public sendGetFolioVentaU(): Observable<any> {
    return this.httpClient.get('/RESTful/webresources/venta/last');
  }
  public sendGetFolioClienteU(): Observable<any> {
    return this.httpClient.get('/RESTful/webresources/generic/last');
  }


  // metodos para agregar
  public sendPostVenta(venta: IVenta): Observable<any> {
    if (venta.idu_folio == null) {
      venta.idu_folio = 0;
    }
    return this.httpClient.post('/RESTful/webresources/venta/add', venta);
  }



  public sendPostConfiguracion(confi: IConfiguracion): Observable<any> {
    if (confi.idu_configuracion == null) {
      confi.idu_configuracion = 0;

    }
    return this.httpClient.post('/RESTful/webresources/confi/add/', confi);
  }

  // metodos modificar
  public sendPutVenta(venta: IVenta): Observable<any> {
    return this.httpClient.put('/RESTful/webresources/venta/', venta);
  }


  public sendPutConfiguracion(confi: IConfiguracion): Observable<any> {
    return this.httpClient.put('/RESTful/webresources/confi/', confi);
  }

  // metodos para eliminar
  public sendDeleteVenta(id: number): Observable<any> {
    return this.httpClient.delete('/RESTful/webresources/venta/' + id);
  }



  public sendDeleteConfiguracion(id: number): Observable<any> {
    return this.httpClient.delete('/RESTful/webresources/confi/' + id);
  }

 


}
