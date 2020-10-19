import { Component, OnInit } from '@angular/core';
import { Ticket } from "../models/Ticket";

@Component({
  selector: 'app-root',
  templateUrl: './tickets.component.html'
})


export class TicketsComponent implements OnInit{
  
  tickets: Ticket[];
  ticketId: string = "";
  ticketFirstName: string;
  ticketLastName: string;
  ticketEmailAddress: string;
  ticketPhoneNumber: string;
  ticketNumberOfPeople: number;
  ticketRegistrationDate: number;

  ticketCount: number = 0;
 
  constructor() { 
        
  }//End of Constructor

  ngOnInit() {

    this.loadTickets();
        
  }  //End of ngOnInit

  logout() {
    window.location.reload(true); 
  }

  
  loadTickets() {

    this.tickets = [new Ticket("1","George","Washington",
    "gwashington@gmail.com","8765554444",4,Date.now()),
    new Ticket("2","John","Adams","jadams@gmail.com","4567778888",5,Date.now())];

    this.ticketCount = 2;

  } //End of loadtickets

  addTicket() {
    this.ticketCount += 1;
    this.ticketId = this.ticketCount.toString();
    this.ticketRegistrationDate = Date.now();
    let ticket = new Ticket(this.ticketId,this.ticketFirstName,this.ticketLastName,
        this.ticketEmailAddress,this.ticketPhoneNumber,this.ticketNumberOfPeople,
          this.ticketRegistrationDate);
    this.tickets.push(ticket);
  }


  get listTickets() {

      return this.tickets;

  }

  
}
