import { Floor } from "./floor";
import { User } from "./user";

export interface Home{
    id?:number,
    name:string,
    adress:string,
    userId:number,
    user?:User,
    floors?:Floor[]
}