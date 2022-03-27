import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from "./AppComponent";
import { FloorComponent } from './components/floor/floor.component';
import { RoomComponent } from './components/room/room.component';
import { DeviceComponent } from './components/device/device.component';
import { LoginComponent } from './components/login/login.component';
import{ HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HouseComponent } from './components/house/house.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DeviceComponent,
    FloorComponent,
    RoomComponent,
    HouseComponent,
    NavbarComponent,
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule

  ],
  exports:[
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
