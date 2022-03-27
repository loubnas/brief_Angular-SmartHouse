import { Injectable } from '@angular/core';
import{ HttpClient} from '@angular/common/http'
import { Device } from '../models/device';



@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http: HttpClient) { }

  urlAPI='http://localhost:3000/devices';

  //CRUD :--------------------------------------------------

//AFFICHER TOUT :

  getAll(){
    return this.http.get<Device[]>(`${this.urlAPI}?_expand=room`);
  }

  getDevice(id:any){
    return this.http.get<Device>(`${this.urlAPI}/${id}?_expand=room`);
  }


//SUPPRIMER:

deleteDevice(id:any){
  return this.http.delete(`${this.urlAPI}/${id}`);
}

 
// ADD device: 

addDevice(Device:any){
  return this.http.post<Device>(this.urlAPI,Device);
}


//Update :

updateDevice(Device:any){

  return this.http.put<Device>(`${this.urlAPI}/${Device.id}`,Device);
}

}