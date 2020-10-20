import { Component, OnInit } from '@angular/core';
import { Ticket } from "../models/Ticket";
import { FormsModule } from '@angular/forms';

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

  editOnSwitch: boolean = false;
 
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
    this.cancelTicket();
  }

  deleteTicket(id:string) {
    for (var i = 0; i<this.tickets.length; i++) {
      if (this.tickets[i].ticketId == id) {
        this.tickets.splice(i,1);
        break;
      }
    }
    this.cancelTicket();
  }

  editTicket(id:string) {
    this.editOnSwitch = true;
    for (var i = 0; i<this.tickets.length; i++) {
      if (this.tickets[i].ticketId == id) {
        this.ticketId = id;
        this.ticketFirstName = this.tickets[i].ticketFirstName;
        this.ticketLastName = this.tickets[i].ticketLastName;
        this.ticketEmailAddress = this.tickets[i].ticketEmailAddress;
        this.ticketPhoneNumber = this.tickets[i].ticketPhoneNumber;
        this.ticketNumberOfPeople = this.tickets[i].ticketNumberOfPeople;
        this.ticketRegistrationDate = this.tickets[i].ticketRegistrationDate;
        break;
      }
    }
  }

  updateTicket() {
    this.editOnSwitch = false;
    for (var i = 0; i<this.tickets.length; i++) {
      if (this.tickets[i].ticketId == this.ticketId) {
        this.ticketId = this.ticketId;
        this.tickets[i].ticketFirstName = this.ticketFirstName;
        this.tickets[i].ticketLastName = this.ticketLastName;
        this.tickets[i].ticketEmailAddress = this.ticketEmailAddress;
        this.tickets[i].ticketPhoneNumber = this.ticketPhoneNumber;
        this.tickets[i].ticketNumberOfPeople = parseInt(this.ticketPhoneNumber,10);
        this.tickets[i].ticketRegistrationDate = this.ticketRegistrationDate;
        break;
      }
    }
    this.cancelTicket();
  }

  cancelTicket() {
    this.editOnSwitch = false;
    this.ticketId = "";
    this.ticketFirstName = "";
    this.ticketLastName = "";
    this.ticketEmailAddress = "";
    this.ticketPhoneNumber = "";
    this.ticketNumberOfPeople = undefined;
    this.ticketRegistrationDate = undefined;
  }


  get listTickets() {

      return this.tickets;

  }

  
}
