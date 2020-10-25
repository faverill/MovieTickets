import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { Ticket } from '../models/Ticket';
//import { AngularFirestore } from '@angular/fire/firestore';

//import * as firebase from 'firebase/app';


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

    notAdmin: boolean = false;


    

    currentUserEmail: string = "faverill45@gmail.com";
    //myTickets: Ticket[] = [];


    constructor(private crudService: CrudService) {

      if (this.notAdmin){
      var myTickets = this.tickets;
      crudService.readSomeTickets(this.currentUserEmail).then(function(result){
        //console.log("In crud.repository with result:");
        //console.log(result);
        
        result.forEach(function(doc){
          var myTicket  = new Ticket(doc.id, doc.data().ticketFirstName, doc.data().ticketLastName, doc.data().ticketEmailAddress,
                  doc.data().ticketPhoneNumber, doc.data().ticketNumberOfPeople,
                  doc.data().ticketRegistrationDate);
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
            ticketRegistrationDate: e.payload.doc.data()['ticketRegistrationDate']
          }
        })
        console.log("In constructor of crud.repository:");
        console.log(this.tickets);
        return this.tickets;
      });
    }
      
      /*
      crudService.readSomeTickets(this.currentUserEmail).then(function(result){
        console.log("crudService.readSomeTickets is back, with result:");
        console.log(result);
        console.log("Now will copy cars from crud to myCars:");
        
        result.forEach(function(doc){
          var myTicket  = new Ticket(doc.id, doc.ticketFirstName, doc.ticketLastName, doc.ticketEmailAddress,
                  doc.ticketPhoneNumber, doc.ticketNumberOfPeople,
                  doc.ticketRegistrationDate);
          this.myTickets.push(myTicket);
          
          console.log("myTickets:");
          console.log(this.myTickets);
        });
        console.log("Finally, myTickets:");
        console.log(this.myTickets);
        // Do I finish up here. This gets printed last.
        
      });
  
      //This code appears to be never reached! But, this.children = myKids is run.??
      //console.log("Setting this.children = myKids");
      //alert("setting this.children = myKids");
      this.tickets = this.myTickets;
      
      //console.log("this.crudService.read_SomeStudents is returning, with this.children:");
      //console.log(this.children);
      // Or do I finish up here. This gets printed first.
      */


    }

    
    /*
    loadTickets():Ticket[] {
       
        return this.tickets;
    
    } //End of loadtickets
    */


    saveTicket(ticket:Ticket) {

      /*
      let record = {};
      record["ticketId"] = ticket.ticketId;
      record["ticketFirstName"] = ticket.ticketFirstName;
      record["ticketLastName"] = ticket.ticketLastName;
      record["ticketEmailAddress"] = ticket.ticketEmailAddress;
      record["ticketPhoneNumber"] = ticket.ticketPhoneNumber;
      record["ticketNumberOfPeople"] = ticket.ticketNumberOfPeople;
      record["ticketRegistrationDate"] = ticket.ticketRegistrationDate;
      console.log("Adding ticket whose RegistrarName is " + this.ticketFirstName + " " + this.ticketLastName);
      */

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
  
    } //End of addTicket

    deleteTicket(id: string) {
      this.crudService.deleteTicket(id);
    }
    

}