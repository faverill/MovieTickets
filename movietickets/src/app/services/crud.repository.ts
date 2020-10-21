import { Injectable, OnInit } from '@angular/core';
import { CrudService } from './crud.service';
import { Ticket } from '../models/Ticket';


@Injectable({
    providedIn: 'root'
})
export class CrudRepository implements OnInit{

    tickets: Ticket[];
    ticketId: string = "";
    ticketFirstName: string;
    ticketLastName: string;
    ticketEmailAddress: string;
    ticketPhoneNumber: string;
    ticketNumberOfPeople: number;
    ticketRegistrationDate: number;

    currentUserEmail: string;


    constructor(private crudService: CrudService) {

    }

    ngOnInit() {
        
    }

    loadTickets():any {
        this.crudService.readAllTickets().subscribe(data => {
          this.tickets = data.map(e => {
            return {
              ticketId: e.payload.doc.data()['ticketId'],
              ticketFirstName: e.payload.doc.data()['ticketFirstName'],
              ticketLastName: e.payload.doc.data()['ticketLastName'],
              ticketEmailAddress: e.payload.doc.data()['ticketEmailAddress'],
              ticketPhoneNumber: e.payload.doc.data()['ticketPhoneNumber'],
              ticketNumberOfPeople: e.payload.doc.data()['ticketNumberOfPeople'],
              ticketRegistrationDate: e.payload.doc.data()['ticketRegistrationDate']
            }
          })
          console.log("In loadTickets in crud.repository:");
          console.log(this.tickets);
          return this.tickets;
        });
        
    
      } //End of loadtickets

      addTicket(ticket:Ticket) {

        let record = {};
        
        record["ticketId"] = ticket.ticketId;
        record["ticketFirstName"] = ticket.ticketFirstName;
        record["ticketLastName"] = ticket.ticketLastName;
        record["ticketEmailAddress"] = ticket.ticketEmailAddress;
        record["ticketPhoneNumber"] = ticket.ticketPhoneNumber;
        record["ticketNumberOfPeople"] = ticket.ticketNumberOfPeople;
        record["ticketRegistrationDate"] = ticket.ticketRegistrationDate;
        console.log("Adding ticket whose RegistrarName is " + this.ticketFirstName + " " + this.ticketLastName);
        
        this.crudService.createNewTicket(record).then(resp => {
          console.log("We added a ticket with resp:")
          console.log(resp);
        })
          .catch(error => {
            console.log(error);
          });
    
      } //End of addTicket
    

}