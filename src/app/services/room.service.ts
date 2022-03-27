import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Room } from '../models/room';


@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }

  urlAPI='http://localhost:3000/rooms';


  //CRUD :--------------------------------------------------

//AFFICHER TOUT :

getAll(){
  return this.http.get<Room[]>(`${this.urlAPI}?_expand=floor&_embed=devices`);
}


getRoom(id:any){
  return this.http.get<Room>(`${this.urlAPI}/${id}?_expand=floor&_embed=devices`);
}

//SUPPRIMER:

deleteRoom(id:any){
return this.http.delete(`${this.urlAPI}/${id}`);
}

}
