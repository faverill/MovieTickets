import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

import * as firebase from 'firebase/app';

import { Ticket } from '../models/Ticket';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  
  createNewTicket(record) {
    return this.firestore.collection('Tickets').add(record);
  }

  readAllTickets() {
    return this.firestore.collection('Tickets').snapshotChanges();
  }


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
            var ticketId = doc.data().ticketId;
            var ticketFirstName = doc.data().ticketFirstName;
            var ticketLastName = doc.data().ticketLastName;
            //console.log(FirstName);
            var ticketEmailAddress = doc.data().ticketEmailAddress;
            var ticketPhoneNumber = doc.data().ticketPhoneNumber;
            var ticketNumberOfPeople = doc.data().ticketNumberOfPeople;
            var ticketRegistrationDate = doc.data().ticketRegistrationDate;
            var ticket = new Ticket(ticketId, ticketFirstName, ticketLastName, ticketEmailAddress, 
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

  updateTicket(recordId,record){
    this.firestore.doc('Tickets/' + recordId).update(record);
  }

  deleteTicket(recordId) {
    this.firestore.doc('Tickets/' + recordId).delete();
  }
}
