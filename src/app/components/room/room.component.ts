import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/models/room';
import { RoomService } from 'src/app/services/room.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'
import { Floor } from 'src/app/models/floor';
import { FloorService } from 'src/app/services/floor.service';
import { Home } from 'src/app/models/home';
import { HouseService } from 'src/app/services/house.service';


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  listofRooms:Room[]=[]
  listofFloors:Floor[]=[]
  listofHouses:Home[]=[]

  myHome?:Home={
    name: '',
    adress: '',
    userId: 0
  }

  

  myFloor?:Floor={

  }

  myRoom: Room={
    name: '',
    floorId: 0
  }

  modalMode="";

  openAdd(content:any) {
    this.clearInput();
    this.modalMode="add"
    this.modalService.open(content);
  } 

  openUpdate(content:any,id:any) {

    this.selectRoom(id,()=>{

      this.myHome=this.listofHouses.find((h)=>h.id==this.myRoom.floor?.homeId);
      console.log(this.myHome)

    });
    this.modalMode="update"
    this.modalService.open(content);
  } 


  constructor(private roomService : RoomService,private houseService:HouseService,private modalService:NgbModal) { }

  ngOnInit(): void {
    this.getAll()
  }

    // Get All  ------------------------------------------------------------------------------------------
getAll(){

  this.houseService.getAll()
  .subscribe((Response)=>{
    this.listofHouses=Response
  })

  this.roomService.getAll()
  .subscribe((Response: Room[])=>{
    this.listofRooms=Response 
  })
}


//delete room ------------------------------------------------------------------------------------------

delete(id:any){
  this.roomService.deleteRoom(id)
  .subscribe(()=>{
    this.listofRooms=this.listofRooms.filter
    ((room) => room.id != id)
  })
}

//Add  ------------------------------------------------------------------------------------------

add(){
  this.roomService.addRoom(this.myRoom)
  .subscribe((Response:Room)=>{

      this.roomService.getRoom(Response.id).subscribe((newRoom)=>{
          this.listofRooms =[ ...this.listofRooms,newRoom];
          this.clearInput();
      });
  })
}

// vider les inputs après l'ajout :
clearInput(){
  this.myRoom ={
    name: '',
    floorId: 0
}  


}

//select house ------------------------------------------------------------------------------------------

selectRoom(id:any,callback:any): void{
this.roomService.getRoom(id)
.subscribe((Response:Room)=>{
this.myRoom=Response;

if(callback) callback();

})
}


//update Home ------------------------------------------------------------------------------------------

update(){
this.roomService.updateRoom(this.myRoom)
.subscribe((Response:Room)=>{
this.roomService.getRoom(Response.id).subscribe((updatedRoom)=>{

  let room=this.listofRooms.find((room)=> room.id==Response.id);
  Object.assign(room,updatedRoom);
})
this.clearInput();
})
}




houseChange(home:Home){
  
  this.myHome=home;
}

}
