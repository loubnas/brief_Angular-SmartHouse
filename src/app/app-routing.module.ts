import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceComponent } from './components/device/device.component';
import { FloorComponent } from './components/floor/floor.component';
import { HouseComponent } from './components/house/house.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RoomComponent } from './components/room/room.component';

const routes: Routes = [
  {path:"", redirectTo:"login", pathMatch:"full"},
  {path:"login",component:LoginComponent},
  {path:"navbar",component:NavbarComponent},
  {path:"floor",component:FloorComponent},
  {path:"house",component:HouseComponent},
  {path:"room",component:RoomComponent},
  {path:"device",component:DeviceComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
