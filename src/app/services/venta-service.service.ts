import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IVenta } from '../models/venta';
@Injectable({
  providedIn: 'root'
})
export class VentaServiceService {

  constructor(private httpClient: HttpClient) { }

  public sendGetVentas(): Observable<any> {
    return this.httpClient.get('/RESTful/webresources/venta/all');
  }

  public sendGetVenta(id: number, parametros?: any): Observable<any> {
    return this.httpClient.get('/RESTful/webresources/venta/all/' + id, {params: parametros});
  }

  // ultimo folio
  public sendGetFolioVentaU(): Observable<any> {
    return this.httpClient.get('/RESTful/webresources/venta/last');
  }

  public sendPostVenta(venta: IVenta): Observable<any> {
    if (venta.idu_folio == null) {
      venta.idu_folio = 0;
    }
    return this.httpClient.post('/RESTful/webresources/venta/add', venta);
  }

  public sendPutVenta(venta: IVenta): Observable<any> {
    return this.httpClient.put('/RESTful/webresources/venta/', venta);
  }

  public sendDeleteVenta(id: number): Observable<any> {
    return this.httpClient.delete('/RESTful/webresources/venta/' + id);
  }


}
