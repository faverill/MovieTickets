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

    currentUserEmail: string;


    constructor(private crudService: CrudService) {
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