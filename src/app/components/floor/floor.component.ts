import { Component, OnInit } from '@angular/core';
import { Floor } from 'src/app/models/floor';
import { FloorService } from 'src/app/services/floor.service';

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.css']
})
export class FloorComponent implements OnInit {

  listofFloors:Floor[]=[]
  constructor(private floorService : FloorService) { }

  ngOnInit(): void {
    this.getAll()
  }

    // Get All  ------------------------------------------------------------------------------------------
getAll(){

 
  this.floorService.getAll()
  .subscribe((Response: Floor[])=>{
    this.listofFloors=Response 
  })
}


//delete home ------------------------------------------------------------------------------------------


}
