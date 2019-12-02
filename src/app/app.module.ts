import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VentasComponent } from './ventas/ventas.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { ArticulosComponent } from './articulos/articulos.component';
import { ClientesComponent } from './clientes/clientes.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { ButtonModule} from 'primeng/button';
import { TableModule} from 'primeng/table';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { RegistrarclienteComponent } from './registrarcliente/registrarcliente.component';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MessageModule} from 'primeng/message';
import {MessagesModule} from 'primeng/messages';
@NgModule({
  declarations: [
    AppComponent,
    VentasComponent,
    ConfiguracionComponent,
    ArticulosComponent,
    ClientesComponent,
    NotFoundComponent,
    NavbarComponent,
    HomeComponent,
    RegistrarclienteComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CheckboxModule,
    InputTextModule,
    ListboxModule,
    ButtonModule,
    CommonModule,
    DropdownModule,
    TableModule,
    HttpClientModule,
    ToastModule,
    MessageModule,
    MessagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
