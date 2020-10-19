import { Component, OnInit } from '@angular/core';
import { Ticket } from "../models/Ticket";

@Component({
  selector: 'app-root',
  templateUrl: './tickets.component.html'
})


export class TicketsComponent implements OnInit{
  
  tickets: Ticket[];
 
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

  } //End of loadtickets

  addTicket() {
    
  }

  deleteTicket(id: string) {

  }

  updateTicket(id:string) {

  }

  cancelThis() {
    
  }

  get listTickets() {

      return this.tickets;

  }

  
}
