import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VentasComponent } from './ventas/ventas.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ArticulosComponent } from './articulos/articulos.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegistrarclienteComponent } from './registrarcliente/registrarcliente.component';


const routes: Routes = [
  { path: 'ventas', component: VentasComponent },
  { path: 'configuracion', component: ConfiguracionComponent},
  { path: 'clientes', component: ClientesComponent},
  { path: 'articulos', component: ArticulosComponent},
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: 'registrarcliente',
    component: RegistrarclienteComponent
  },
  {
    path: 'editarcliente/:id',
    component: RegistrarclienteComponent,
    data : { title: 'editar' },
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
