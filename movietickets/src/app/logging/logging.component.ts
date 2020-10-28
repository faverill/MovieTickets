import { Component, NgZone, OnInit } from '@angular/core';
//import { Ticket } from "../models/ticket";
//import { BoundAttribute } from '@angular/compiler/src/render3/r3_ast';
//import { CrudService } from "../services/crud.service";

import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

//import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
//import { MessageService } from '../services/message.service';
//import { async } from '@angular/core/testing';

@Component({
  templateUrl: './logging.component.html'
})


export class LoggingComponent implements  OnInit{
  

  email: string;
  password: string;
  //currentUser = firebase.auth().currentUser;
  //adminEmail: string;
  userEmail: string;
  isAdmin: boolean = false;
  currentUserId: string = null;
  userName: string = "";
  gotCredentials: boolean = false;
  spinnerOn: boolean;
  
  result: any;
  loggedInGoogle: boolean;
  
  

  constructor(public authService: AuthService, public myAuth: AngularFireAuth, 
                public router:Router,private ngZone: NgZone) { }



  ngOnInit() {

    this.spinnerOn = true;

    //This is a hack. Apparently, the page needs a little
    //more time to load when coming back from GoogleLogin
    setTimeout(function(){ 
      //this.spinnerOn = false;
      //alert("Hello"); 
    }, 1000);

    //This doesn't accomplish anything. Maybe we
    //can use it at another time.
    /*
    this.messService.event.subscribe((data) => {
      console.log("In logging.component with data:");
      console.log(data);
    });
    */

    this.myAuth.onIdTokenChanged(auth => {
      
      

      if( auth != null){
        
        
        
        console.log("auth.providerData[0].providerId:");
        console.log(auth.providerData[0].providerId);

        this.currentUserId = auth.uid;
        // auth.displayName == null for a new user. I suspect the 
        // return value.user.updateProfile({displayName: userName}); in auth.service
        // does not complete before onIdTokenChanged below fires.
        if( auth.displayName != null ) {
          this.userName = auth.displayName;
        } else {
          //console.log("Logged in with auth.displayName = null");
        }
        // console.log("In logging.component =======>");
        //console.log("Logged in as this.userName = " + this.userName);
        //console.log("user is = " + auth.uid);
        //console.log(auth.email);
        this.userEmail = auth.email;

       
        
        //this.loadChildren();
        auth.getIdTokenResult().then(idTokenResult => {

          
          
          //console.log("idTokenResult.claims:");
          //console.log(idTokenResult.claims);
          if( idTokenResult.claims.admin) {
            this.isAdmin = true;
          } else {
            this.isAdmin = false;
          }
          
        });

       
        this.navigate(["/tickets"]);  //This makes use of the NgZone
       
        
        
      } else {
        console.log("auth is null and spinner off");
        //This doesn't work unless you have the 1 second setTimeout()
        //at top of ngOnInit
        this.spinnerOn = false;
      }

      
    })

  }

  
  /*
  checkForGoogleLogin() {
    this.crudService.read_GoogleLogin().subscribe(data => {
      this.result = data.map(e => {
        return {
          id: e.payload.doc.id,
          google: e.payload.doc.data()['google']
        }
      });
     console.log("this.result:");
     console.log(this.result);
     console.log("this.result[0].google:");
     console.log(this.result[0].google);
     let googleTest: boolean = this.result[0].google;
     //googleTest == true means that this is a return from 
     //Google Login. Will be set to false in table.component
     if(googleTest == true) {
       console.log("googleTest is true");
       this.spinnerOn = true;
     } else{
      console.log("googleTest is false.");
      this.spinnerOn = false;
     }
    })
  }
  */


  

  public navigate(commands: any[]): void {
    this.ngZone.run(() => this.router.navigate(commands)).then();
  }

  googleSignin() {

    /* We are not using this anymore
    let record = {};
    record["id"] = this.googleId;
    //recored["google"] set true here and false in table.component
    record["google"] = true;
    this.crudService.update_GoogleLogin(this.googleId,record);
    */

    this.authService.loginWithGoogle();
    //this.loginIsVisible = false;
    this.email = this.password = "";
  }

  googleLogout() {
    this.authService.logoutWithGoogle();
    //this.loginIsVisible = false;
    this.email = this.password = "";
  }

  

  signup() {
    if(this.thereAreBlanks(this.email,"Your Email Address")) { return; }
    // Passwords can contain only numbers so you can't use thereAreBlanks here
    //if(this.thereAreBlanks(this.password,"Your Password")) {return;}
    if(!this.validateEmail(this.email)) { return; }
    while (this.userName.trim() == "") {
      this.userName = prompt("Please enter you name (first and last):");
    }
    console.log("Signing up new user with userName = " + this.userName);
    this.authService.signup(this.email, this.password, this.userName);
    
    /*
    if(firebase.auth().currentUser != null){
      console.log("In table.component.ts with userId = " + firebase.auth().currentUser.uid);
      this.loginIsVisible = false;
    }
    */
    //this.loginIsVisible = false;
    this.email = this.password = '';
  }

  login() {
    if(this.thereAreBlanks(this.email,"Your Email Address")) { return; }
    //if(this.thereAreBlanks(this.password,"Your Password")) { return; }
    if(!this.validateEmail(this.email)) { return; }
    this.authService.login(this.email, this.password);
    /*
    if(firebase.auth().currentUser != null){
      console.log("In table.component.ts with userId = " + firebase.auth().currentUser.uid);
      this.loginIsVisible = false;
    }
    */

    //this.loginIsVisible = false;
    this.email = this.password = "";
  }

  logout() {
    this.authService.logout();

    //this.loginIsVisible = true;
    //this.isAdmin = false;
    //this.editIsVisible = false;
   
    //window.location.reload(true); this won't work here. Must be in auth.service.logout()
  }

  resetPassword() {
    if( this.thereAreBlanks(this.email, "You Email Address") ){
      return;
    }
    alert("Please note that this only works if you are using email login. " +
      "If you are using Google Signin, you must go through Google to change your password.");
    alert("Check your email for a link to reset your password. Please note that this " +
          "link will expire within the next hour, so respond as soon as you receive it.");
          
    this.authService.resetThePassword(this.email);
  }

  thereAreBlanks(name: string, label: string) {
    //var a = name.trim();
    var a = name;
    if (a ==null || a == "" || a == undefined || a == " ") {
      alert(label + " cannot be blank. Please enter " + label + ".");
      return true;
    }
    else {
      let reg = /[a-z]/i;
      if(reg.test(name)) {
        return false;
      }
      alert(label + " must contain some alphabetic characters. Please re-enter " + 
        label + ".");
      return true;
    }
  }

  validateEmail(email: string){
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if(email.match(mailformat)){
        console.log(email + " is valid format.");
        return true;
      }
      else
      {
        console.log(email + " is not a valid format.");
        alert("Sorry, but your Contact Email does not appear to be in a valid format." +
          " Please correct.");
        return false;
      }
  }
}