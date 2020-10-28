import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { AuthService } from './auth.service';
import { Ticket } from '../models/Ticket';
//import { AngularFirestore } from '@angular/fire/firestore';

import * as firebase from 'firebase/app';

import { Router } from '@angular/router';


@Injectable()
export class CrudRepository {

    tickets: Ticket[] = [];
    ticketId: string = "";
    ticketFirstName: string;
    ticketLastName: string;
    ticketEmailAddress: string;
    ticketPhoneNumber: string;
    ticketNumberOfPeople: number;
    ticketRegistrationDate: number;
    ticketRegistrarId: string;
    ticketRegistrarName: string;

    isAdmin: boolean = false;
    currentUserId: string;
    userName: string;
    userEmail: string;


    

    //currentUserEmail: string = "faverill45@gmail.com";
    //myTickets: Ticket[] = [];


    constructor(private crudService: CrudService, private router: Router, private myAuthService: AuthService) {

      //Making use of the user Observable in AuthService
      myAuthService.user.subscribe(data => {
        this.currentUserId = data.uid;
        console.log("In crud.repository with this.currentUserId = " + this.currentUserId);
        if( this.currentUserId != undefined ) {

            //Temporary setting up of an admin using email address
            //if( data.email == "faverill45@gmail.com" ) { this.notAdmin = false;}
            var user = firebase.auth().currentUser;
            user.getIdTokenResult().then(idTokenResult => {
                console.log(idTokenResult.claims);
                console.log("idTokenResult.claims.admin = " + idTokenResult.claims.admin);
                if( idTokenResult.claims.admin ) {
                  this.isAdmin = true;
                } else {
                  this.isAdmin = false;
                }
                console.log("In crud.repository, this.isAdmin = " + this.isAdmin);
                if (!this.isAdmin){
      
                  var myTickets = this.tickets;
                  console.log("In crud.repository with this.currentUserId = " + this.currentUserId);
                  console.log("at top of crudService.readSomeTickets");
                  crudService.readSomeTickets(this.currentUserId).then(function(result){
                    console.log("In crud.repository with result:");
                    console.log(result);
                    
                    result.forEach(function(doc){
                      var myTicket  = new Ticket(doc.id, doc.data().ticketFirstName, doc.data().ticketLastName, doc.data().ticketEmailAddress,
                              doc.data().ticketPhoneNumber, doc.data().ticketNumberOfPeople,
                              doc.data().ticketRegistrationDate,doc.data().ticketRegistrarId,doc.data().ticketRegistrarName);
                      myTickets.push(myTicket);
                      
                      console.log("myTickets:");
                      console.log(myTickets);
                    });
                    //console.log("Finally, this.tickets:");
                    //console.log(this.tickets);
                    
                  });
              } else {
                //This is a subscription to the Listener (Observable) being returned by readAllTickets
                
                crudService.readAllTickets().subscribe(data => {
                  this.tickets = data.map(e => {
                    return {
                      id: e.payload.doc.id,
                      ticketFirstName: e.payload.doc.data()['ticketFirstName'],
                      ticketLastName: e.payload.doc.data()['ticketLastName'],
                      ticketEmailAddress: e.payload.doc.data()['ticketEmailAddress'],
                      ticketPhoneNumber: e.payload.doc.data()['ticketPhoneNumber'],
                      ticketNumberOfPeople: e.payload.doc.data()['ticketNumberOfPeople'],
                      ticketRegistrationDate: e.payload.doc.data()['ticketRegistrationDate'],
                      ticketRegistrarId: e.payload.doc.data()['ticketRegistrarId'],
                      ticketRegistrarName: e.payload.doc.data()['ticketRegistrarName']
                    }
                  })
                  console.log("In constructor of crud.repository:");
                  console.log(this.tickets);
                  return this.tickets;
                });
    
              } //End of else
            }); //End of user.getIdTokenResult().then

            
            
            
        } //End of if( this.currentUserId != undefined)
      }); //End of myAuthService.user.subscribe
     
    } //End of constructor

    
    saveTicket(ticket:Ticket) {
      console.log("In crud.repository with ticket.ticketId =")
      if (ticket.id == null || ticket.id == ""){
        this.crudService.createNewTicket(ticket).then(resp => {
          console.log("We added a ticket with resp:")
          console.log(resp);
        })
          .catch(error => {
            console.log(error);
        });
      } else {
        this.crudService.updateTicket(ticket.id,ticket);
      }
     
    } //End of saveTicket

    deleteTicket(id: string) {
      this.crudService.deleteTicket(id);
    }
    

}