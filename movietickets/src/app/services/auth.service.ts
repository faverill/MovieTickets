import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs';
import { Router } from "@angular/router";
//import { MessageService } from './message.service';

//Absolutely neccessary for const addAdminRole = firebase.functions().... to work!!!
import "firebase/functions";

@Injectable({providedIn: "root"})
export class AuthService {

  //Is this being used???
  user: Observable<firebase.User>;
  //provider:any;
  currentUserId: string;

  constructor(private firebaseAuth: AngularFireAuth,
      private router: Router) {
    this.user = firebaseAuth.authState;
    //this.currentUserId = firebase.auth().currentUser.uid
    //this.provider = new firebase.auth.GoogleAuthProvider();
  }


  loginWithGoogle() {
    
    //alert("Standby....Google Login usually takes a while.....No need to Login again!!");
    //this.messService.publish({data:'using google login'});
    var provider = new firebase.auth.GoogleAuthProvider();
    
    firebase.auth().signInWithRedirect(provider);
    
    

    //alert("return from google.signIn in auth.service");
    
    /*
    firebase.auth().getRedirectResult().then(function(result) {
      if (result.credential) {
        //var token = result.credential.accessToken;
        console.log(result.credential);
      }
      
      var user = result.user;
      console.log("In loginWithGoogle with user:");
      console.log(user);
      alert("getRedirectResult complete");

    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    })
    */
    

  }

  logoutWithGoogle() {
    firebase.auth().signOut().then(function(){
      console.log("Logged out of Google successfully!");
      window.location.reload();
    }).catch(function(error){
      console.log("Sorry, but there was an error logging out of Google:");
      console.log(error);
    })
  }

  createAdmin(email: string) {
    //alert("In createAdmin in auth.service with email = " + email);
    const adminEmail = email;
    
    //Needs import "firebase/functions";
    const addAdminRole = firebase.functions().httpsCallable("addAdminRole");
    addAdminRole({email: adminEmail}).then(function(result){

      console.log(result);

      if(result.data.errorInfo.message){
        alert("Sorry, " + result.data.errorInfo.message);
      }

    }).catch(function(err){
        alert("Success! You've added " + email + " as an admin.");
    });
  }

  deleteAdmin(email: string) {
    
    const deleteAdminRole = firebase.functions().httpsCallable('deleteAdminRole');
    
    deleteAdminRole({ email }).then(function(result){
      //console.log(result);
      if(result.data.errorInfo.message) {
        alert("Sorry, " + result.data.errorInfo.message);
      } 
    }).catch(function(err) {
      alert("Success! You've deleted " + email + " as an admin.");
      
    });
    
  };  //End of btnDeleteAdmin


  signup(email: string, password: string, userName: string) {
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
        console.log('New user created with user.id = ' + firebase.auth().currentUser.uid);
        this.router.navigateByUrl("/tickets");
        return value.user.updateProfile({displayName: userName});
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
        alert("Something went wrong with signup: " + err.message);
      });    
  }

  login (email: string, password: string){
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
        console.log('User logged in with user.id = ' + firebase.auth().currentUser.uid);
        
        var user = firebase.auth().currentUser;
        this.router.navigateByUrl("/tickets");
        /*
        var name: string = "";
        if( user.email == "faverill45@gmail.com") {
          name = "Frank (gmail) Averill";
        } else if ( user.email == "elgin6445@yahoo.com") {
          name = "Frank (yahoo) Averill";
        } else {
          name = "Frank (att) Averill";
        }
        */
       /*
        user.getIdTokenResult().then(idTokenResult => {
          console.log(idTokenResult.claims);
          console.log("idTokenResult.claims.admin = " + idTokenResult.claims.admin);
        });
        */
        //console.log("UserName set to : " + name);
        //return value.user.updateProfile( {displayName: name });
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
        alert("Something went wrong with login: " + err.message);
      });
      
  }

  logout() {
    this.firebaseAuth
      .signOut().then(() => {
        console.log("signed out in auth.service");
        window.location.reload();
       
      });
  }

  resetThePassword(email: string){
    this.firebaseAuth.sendPasswordResetEmail(email).then(function(){
      
    }).catch(function(error){
      alert("Sorry, but Your Email Address is not listed as that of one of our current users.");
    })
  }

}