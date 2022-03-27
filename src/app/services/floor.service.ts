import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Floor } from '../models/floor';

@Injectable({
  providedIn: 'root'
})
export class FloorService {

  constructor(private http: HttpClient) { }

  urlAPI='http://localhost:3000/floors';

  //CRUD :--------------------------------------------------

//AFFICHER TOUT :

  getAll(){
    return this.http.get<Floor[]>(`${this.urlAPI}?_expand=home&_embed=rooms`);
  }

  
  getFloor(id:any){
    return this.http.get<Floor>(`${this.urlAPI}/${id}?_expand=home&_embed=rooms`);
  }

  //SUPPRIMER:

deleteFloor(id:any){
  return this.http.delete(`${this.urlAPI}/${id}`);
}




 

}
