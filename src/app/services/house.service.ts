import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVars } from '../common/global-vars';
import { Home } from '../models/home';

@Injectable({
  providedIn: 'root'
})
export class HouseService {

constructor(private http: HttpClient) { }

urlAPI='http://localhost:3000/homes';

//CRUD :--------------------------------------------------

//AFFICHER TOUT :

getAll(){
  return this.http.get<Home[]>(`${this.urlAPI}?_embed=floors`);
}

getHouse(id:any){
  return this.http.get<Home>(`${this.urlAPI}/${id}?_embed=floors`);
}


//SUPPRIMER:
deleteHouse(id:any){
  return this.http.delete(`${this.urlAPI}/${id}?_embed=floors`);

}

// ADD device: 

addHome(Home:any){
  Home.userId=GlobalVars.connectedUser?.id;
  return this.http.post<Home>(this.urlAPI,Home);
}


//Update :

updateHome(Home:any){

  return this.http.put<Home>(`${this.urlAPI}/${Home.id}`,Home);
}


}