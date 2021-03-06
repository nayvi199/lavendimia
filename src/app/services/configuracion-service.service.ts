import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IConfiguracion } from '../models/configuracion';
@Injectable({
  providedIn: 'root'
})
export class ConfiguracionServiceService {
 // private REST_API_SERVER = 'http://189.186.124.55/RESTful2/webresources';
 constructor(private httpClient: HttpClient) { }

 public sendGetConfiguracion(): Observable<any> {
   return this.httpClient.get('/RESTful/webresources/confi/all');
 }

 // obtener registros especificos
 public sendGetConfiguracionC(id: number, parametros?: any): Observable<any> {
   return this.httpClient.get('/RESTful/webresources/confi/all/' + id, {params: parametros});
 }


 // Obtener ultimos agregados


 // metodos para agregar
 public sendPostConfiguracion(confi: IConfiguracion): Observable<any> {
   if (confi.idu_configuracion == null) {
     confi.idu_configuracion = 0;

   }
   return this.httpClient.post('/RESTful/webresources/confi/add/', confi);
 }

 // metodos modificar
 public sendPutConfiguracion(confi: IConfiguracion): Observable<any> {
   return this.httpClient.put('/RESTful/webresources/confi/', confi);
 }

 // metodos para eliminar
 public sendDeleteConfiguracion(id: number): Observable<any> {
   return this.httpClient.delete('/RESTful/webresources/confi/' + id);
 }

}
