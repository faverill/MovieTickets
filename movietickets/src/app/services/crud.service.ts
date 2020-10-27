import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

import { Ticket } from '../models/Ticket';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  currentUserId: string;
  currentUserName: string;
  currentUserEmail: string;
  notAdmin: boolean = true;

  constructor(private firestore: AngularFirestore, private myAuth: AngularFireAuth) { 

    
  }

  
  createNewTicket(ticket) {
    let record = {};
      //record["ticketId"] = ticket.ticketId;
      record["ticketFirstName"] = ticket.ticketFirstName;
      record["ticketLastName"] = ticket.ticketLastName;
      record["ticketEmailAddress"] = ticket.ticketEmailAddress;
      record["ticketPhoneNumber"] = ticket.ticketPhoneNumber;
      record["ticketNumberOfPeople"] = ticket.ticketNumberOfPeople;
      record["ticketRegistrationDate"] = ticket.ticketRegistrationDate;
      record["ticketRegistrarId"] = ticket.ticketRegistrarId;
      record["ticketRegistrarName"] = ticket.ticketRegistrarName;
    return this.firestore.collection('Tickets').add(record);
  }

  readAllTickets() {
    //This is a listener (or Observable) for changes in the Tickets collection
    //Listens for changes in both the local collection and the server collection
    return this.firestore.collection('Tickets').snapshotChanges();
  }

  readSomeTickets(currentUserId: string) {
    return firebase.firestore().collection('Tickets').where("ticketRegistrarId", "==", currentUserId ).get();
  }
  
  //This is also a listener, but only listens for changes in the where(X) category
  /*
  async readSomeTickets(currentUserEmail: string) {
    console.log("In read_SomeCars with currentUserEmail = " + currentUserEmail);
    console.log("Beginning the await");
    var myTickets = [];
    await firebase.firestore().collection('Tickets').
        where("ticketEmailAddress", "==", currentUserEmail).
        get().then(function(querySnapShot){

        //get().then(function(querySnapShot){
        //var children = [];
        querySnapShot.forEach(function(doc){
          //var child = new Child();
          var id = doc.id;
          var ticketFirstName = doc.data().ticketFirstName;
          var ticketLastName = doc.data().ticketLastName;
          //console.log(FirstName);
          var ticketEmailAddress = doc.data().ticketEmailAddress;
          var ticketPhoneNumber = doc.data().ticketPhoneNumber;
          var ticketNumberOfPeople = doc.data().ticketNumberOfPeople;
          var ticketRegistrationDate = doc.data().ticketRegistrationDate;
          var ticket = new Ticket(id, ticketFirstName, ticketLastName, ticketEmailAddress, 
            ticketPhoneNumber, ticketNumberOfPeople,
            ticketRegistrationDate)
          myTickets.push(ticket);
          //children.push(new Child(id ,FirstName, LastName, EmailAddress, RegistrarId, RegistrarName));
        });
          
        }); //End of await
        console.log("await in readSomeCars is done with myCars:");
        console.log(myTickets);

        // Now that firebase.firestore().etc is back from the await, we can return kids to table.component
        return myTickets;
  }
  */

  updateTicket(recordId,ticket: Ticket){
    let record = {};
      record["id"] = ticket.id;
      record["ticketFirstName"] = ticket.ticketFirstName;
      record["ticketLastName"] = ticket.ticketLastName;
      record["ticketEmailAddress"] = ticket.ticketEmailAddress;
      record["ticketPhoneNumber"] = ticket.ticketPhoneNumber;
      record["ticketNumberOfPeople"] = ticket.ticketNumberOfPeople;
      record["ticketRegistrationDate"] = ticket.ticketRegistrationDate;
      record["ticketRegistrarId"] = ticket.ticketRegistrarId;
      record["ticketRegistrarName"] = ticket.ticketRegistrarName;
    this.firestore.doc('Tickets/' + recordId).update(record);
  }

  deleteTicket(recordId) {
    this.firestore.doc('Tickets/' + recordId).delete();
  }
}
