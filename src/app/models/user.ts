import { Home } from "./home";

export interface User{
    id?:number,
    email?:string,
    password?:string,
    homes?:Home[]
}