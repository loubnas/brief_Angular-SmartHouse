import { Component, OnInit } from '@angular/core';
import { Floor } from 'src/app/models/floor';
import { Home } from 'src/app/models/home';
import { FloorService } from 'src/app/services/floor.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'
import { HouseService } from 'src/app/services/house.service';


@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.css']
})
export class FloorComponent implements OnInit {

  listofFloors:Floor[]=[]
  listofHouses:Home[]=[]


  modalMode="";

  myHome?: Home={
    name: '',
    adress: '',
    userId: 0
  }

  myFloor: Floor={
  }

  openAdd(content:any) {
    this.clearInput();
    this.modalMode="add"
    this.modalService.open(content);
  } 

  openUpdate(content:any,id:any) {

    this.selectFloor(id,()=>{

      this.myHome=this.listofHouses.find((h)=>h.id==this.myFloor.homeId);

    });
    this.modalMode="update"
    this.modalService.open(content);
  } 

  constructor(private floorService : FloorService,private houseService : HouseService,private modalService:NgbModal) { }

  ngOnInit(): void {
    this.getAll()
  }

    // Get All  ------------------------------------------------------------------------------------------
getAll(){
  
  this.houseService.getAll()
  .subscribe((Response: Home[])=>{
    this.listofHouses=Response 
  })

  this.floorService.getAll()
  .subscribe((Response: Floor[])=>{
    this.listofFloors=Response 
    console.log(this.listofFloors.length)
  })
}


//delete floor ------------------------------------------------------------------------------------------

delete(id:any){
  this.floorService.deleteFloor(id)
  .subscribe(()=>{
    this.listofFloors=this.listofFloors.filter
    ((floor) => floor.id != id)
  })
}


//Add floor ------------------------------------------------------------------------------------------

add(){
  this.floorService.addFloor(this.myFloor)
  .subscribe((Response:Floor)=>{

      this.floorService.getFloor(Response.id).subscribe((newFloor)=>{
          this.listofFloors =[ ...this.listofFloors,newFloor];
          this.clearInput();
      });
  })
}

// vider les inputs après l'ajout :
clearInput(){
  this.myFloor ={

  }
}  



//select floor ------------------------------------------------------------------------------------------

selectFloor(id:any,callback:any){
  this.floorService.getFloor(id)
.subscribe((Response:Floor)=>{
  this.myFloor=Response;

  if(callback) callback();

})
}


//update floor ------------------------------------------------------------------------------------------

update(){
  this.floorService.updateFloor(this.myFloor)
  .subscribe((Response:Floor)=>{
    this.floorService.getFloor(Response.id).subscribe((updatedFloor)=>{
      let floor=this.listofFloors.find((floor)=> floor.id==Response.id);
          Object.assign(floor,updatedFloor);
    })
    this.clearInput();
  })
}

homeChange(home:Home){
  
  this.myHome=home;
  this.myFloor.homeId=this.myHome.id;
}


}
   



   

