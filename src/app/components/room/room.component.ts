import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/models/room';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  listofRooms:Room[]=[]

  constructor(private roomService : RoomService) { }

  ngOnInit(): void {
    this.getAll()
  }

    // Get All  ------------------------------------------------------------------------------------------
getAll(){

 
  this.roomService.getAll()
  .subscribe((Response: Room[])=>{
    this.listofRooms=Response 
  })
}


//delete home ------------------------------------------------------------------------------------------

delete(id:any){
  this.roomService.deleteRoom(id)
  .subscribe(()=>{
    this.listofRooms=this.listofRooms.filter
    ((room) => room.id != id)
  })
}
}
