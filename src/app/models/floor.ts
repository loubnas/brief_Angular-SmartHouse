import { Home } from "./home";
import { Room } from "./room";

export interface Floor{
    id?:number,
    number?:number,
    homeId?:number,
    home?:Home,
    rooms?:Room[]


}