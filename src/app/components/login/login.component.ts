import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalVars } from 'src/app/common/global-vars';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService :  LoginService,private router:Router) { }

  ngOnInit(): void {

   
    }
    loginForm= new FormGroup(
      {
        email : new FormControl('',[Validators.required,Validators.email,]),
        password : new FormControl ('',[Validators.required,Validators.minLength(6)]),

 
      }
    )




    submitform(){
        const val = this.loginForm.value;

        if (val.email && val.password) {
            this.loginService.login({"email":val.email, "password":val.password})
                .subscribe(
                    (Response:User[]) => {
                      if(Response.length>0){
                        console.log("User is logged in");
                        GlobalVars.connectedUser=Response[0];
                        this.router.navigate(['/house']);
                      }
                    }
                );
        }
      }

    
  
  }