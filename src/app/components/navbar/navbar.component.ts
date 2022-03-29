import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVars } from 'src/app/common/global-vars';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router) { }


  ngOnInit(): void {
    
  }
  getConnectedUser(){
    return GlobalVars.connectedUser;
  }

  logout(){
    GlobalVars.connectedUser=undefined;
    this.router.navigate(['/']);
  }
  

}
