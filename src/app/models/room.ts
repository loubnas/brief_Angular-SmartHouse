import { Device } from "./device";
import { Floor } from "./floor";

export interface Room{
    id?:number,
    name:string,
    floorId:number,
    floor?:Floor,
    devices?:Device[]
}