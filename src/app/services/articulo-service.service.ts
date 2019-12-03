import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IArticulo } from '../models/articulo';
@Injectable({
  providedIn: 'root'
})
export class ArticuloServiceService {

  constructor(private httpClient: HttpClient) { }

  public sendGetArticulos(): Observable<any> {
    return this.httpClient.get('/RESTful/webresources/articulo/all');
  }

  public sendGetArticulo(id: number, parametros?: any): Observable<any> {
    return this.httpClient.get('/RESTful/webresources/articulo/all/' + id, {params: parametros});
  }

  // Folio del nuevo articulo
  public sendGetFolioArticuloU(): Observable<any> {
    return this.httpClient.get('/RESTful/webresources/articulo/last');
  }

  public sendPostArticulo(articulo: IArticulo): Observable<any> {
    if (articulo.idu_articulo == null) {
      articulo.idu_articulo = 0;
    }
    return this.httpClient.post('/RESTful/webresources/articulo/add/', articulo);
  }

  public sendPutArticulo(articulo: IArticulo): Observable<any> {
    return this.httpClient.put('/RESTful/webresources/articulo/', articulo);
  }

  public sendDeleteArticulo(id: number): Observable<any> {
    return this.httpClient.delete('/RESTful/webresources/articulo/' + id);
  }
}
