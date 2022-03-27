import { Component, OnInit } from '@angular/core';
import { Device } from 'src/app/models/device';
import { DeviceService } from 'src/app/services/device.service';
import { FloorService } from 'src/app/services/floor.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'
import { Floor } from 'src/app/models/floor';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  listofDevices:Device[]=[]
  listofFloors:Floor[]=[]

  modalMode="";

  myFloor?:Floor={

  }

  myDevice: Device={
  }
 


  openAdd(content:any) {
    this.clearInput();
    this.modalMode="add"
    this.modalService.open(content);
  } 

  openUpdate(content:any,id:any) {

    this.selectDevice(id,()=>{

      this.myFloor=this.listofFloors.find((f)=>f.id==this.myDevice.room?.floorId);

    });
    this.modalMode="update"
    this.modalService.open(content);
  } 
  



  constructor(private deviceService :DeviceService,private floorService:FloorService,private modalService:NgbModal ) {}


  ngOnInit(): void {
    this.getAll()
  }
 
// Get All devices ------------------------------------------------------------------------------------------
getAll(){

  this.floorService.getAll()
  .subscribe((Response)=>{
    this.listofFloors=Response
  })

  this.deviceService.getAll()
  .subscribe((Response)=>{
    this.listofDevices=Response 
  })


}


//Add device ------------------------------------------------------------------------------------------

add(){
    this.deviceService.addDevice(this.myDevice)
    .subscribe((Response:Device)=>{

        this.deviceService.getDevice(Response.id).subscribe((newDevice)=>{
            this.listofDevices =[ ...this.listofDevices,newDevice];
            this.clearInput();
        });
    })
}
 
  // vider les inputs après l'ajout :
clearInput(){
    this.myDevice ={
    device :'',
    status :false
    }
}  
  


//delete device ------------------------------------------------------------------------------------------

delete(id:any){
  this.deviceService.deleteDevice(id)
  .subscribe(()=>{
    this.listofDevices=this. listofDevices.filter
    ((device) => device.id != id)
  })
}
   

//selectdevice ------------------------------------------------------------------------------------------

 selectDevice(id:any,callback:any){
    this.deviceService.getDevice(id)
  .subscribe((Response:Device)=>{
    this.myDevice=Response;

    if(callback) callback();

  })
}


//update device ------------------------------------------------------------------------------------------

update(){
  this.deviceService.updateDevice(this.myDevice)
  .subscribe((Response:Device)=>{
    this.deviceService.getDevice(Response.id).subscribe((updatedDevice)=>{
      let device=this.listofDevices.find((device)=> device.id==Response.id);
          Object.assign(device,updatedDevice);
    })
    this.clearInput();
  })
}


// changement de status device ------------------------------------------------------------------------------------------

toggleStatus(id:any){
  //console.log("toggle:",id);
  this.selectDevice(id,()=>{
      this.myDevice.status=!this.myDevice?.status;
      this.deviceService.updateDevice(this.myDevice)
      .subscribe((Response:Device)=>{
        
          let device=this.listofDevices.find((device)=> device.id==Response.id);
          Object.assign(device,Response);
          this.clearInput();
      })
  });
  
 
}



floorChange(floor:Floor){
  
    this.myFloor=floor;
    this.myDevice.roomId=-1;
    this.myDevice.room=null;
}



}