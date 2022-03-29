import { Component, OnInit } from '@angular/core';
import { Home } from 'src/app/models/home';
import { HouseService } from 'src/app/services/house.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'


@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit {

  myHome: Home={
    name: '',
    adress: '',
    userId: 0
  }



  modalMode="";

  listofHouses:Home[]=[]

  openAdd(content:any) {
    this.clearInput();
    this.modalMode="add"
    this.modalService.open(content);
  } 

  openUpdate(content:any,id:any) {

    this.selectHouse(id,null);
    this.modalMode="update"
    this.modalService.open(content);
  } 
  


  constructor(private houseService : HouseService,private modalService:NgbModal) { }

  ngOnInit(): void {
    this.getAll()
  }


 
  // Get All  ------------------------------------------------------------------------------------------
getAll(){

 
  this.houseService.getAll()
  .subscribe((Response: Home[])=>{
    this.listofHouses=Response 
  })
}


//delete room ------------------------------------------------------------------------------------------

delete(id:any){
  this.houseService.deleteHouse(id)
  .subscribe(()=>{
    this.listofHouses=this.listofHouses.filter
    ((home) => home.id != id)
  })
}


//Add  ------------------------------------------------------------------------------------------

add(){
    this.houseService.addHome(this.myHome)
    .subscribe((Response:Home)=>{

        this.houseService.getHouse(Response.id).subscribe((newHome)=>{
            this.listofHouses =[ ...this.listofHouses,newHome];
            this.clearInput();
        });
    })
}
 
  // vider les inputs après l'ajout :
clearInput(){
   this.myHome ={
    name: '',
    adress: '',
    userId: 0
}  

}
  
//select house ------------------------------------------------------------------------------------------

selectHouse(id:any,callback:any): void{
  this.houseService.getHouse(id)
.subscribe((Response:Home)=>{
  this.myHome=Response;

  if(callback) callback();

})
}


//update Home ------------------------------------------------------------------------------------------

update(){
this.houseService.updateHome(this.myHome)
.subscribe((Response:Home)=>{
  this.houseService.getHouse(Response.id).subscribe((updatedHouse)=>{

    let house=this.listofHouses.find((house)=> house.id==Response.id);
    Object.assign(house,updatedHouse);
  })
  this.clearInput();
})
}



}
