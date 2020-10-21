import { Component, OnInit } from '@angular/core';
import { Ticket } from "../models/Ticket";
//FormsModule does not have to be imported here as long as it is in app.module.ts
//import { FormsModule } from '@angular/forms';

import { CrudService } from "../services/crud.service";

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
  currentUserEmail: string;
 
  constructor(private crudService: CrudService) { 
        
  }//End of Constructor

  ngOnInit() {

    this.loadTickets();
    
        
  }  //End of ngOnInit

  logout() {
    window.location.reload(true); 
  }

  
  loadTickets() {

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
    });
  
    
  } //End of loadtickets

  addTicket() {

    if (this.ticketDataIsInvalid()){
      return;
    }

    let randInteger = Math.floor((Math.random() * 10000000000) + 1).toString();
    this.ticketId = randInteger;
    let nowsDate = Date.now();
    this.ticketRegistrationDate = nowsDate;
    this.currentUserEmail = this.ticketEmailAddress;

    let record = {};
    
    record["ticketId"] = randInteger;
    record["ticketFirstName"] = this.ticketFirstName;
    record["ticketLastName"] = this.ticketLastName;
    record["ticketEmailAddress"] = this.ticketEmailAddress;
    record["ticketPhoneNumber"] = this.ticketPhoneNumber;
    record["ticketNumberOfPeople"] = this.ticketNumberOfPeople;
    record["ticketRegistrationDate"] = nowsDate;
    console.log("Adding ticket whose RegistrarName is " + this.ticketFirstName + " " + this.ticketLastName);
    
    this.crudService.createNewTicket(record).then(resp => {
      this.currentUserEmail = this.ticketEmailAddress;
      console.log("We added a ticket with resp:")
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
    });
    
    let ticket = new Ticket(this.ticketId,this.ticketFirstName,this.ticketLastName,
        this.ticketEmailAddress,this.ticketPhoneNumber,this.ticketNumberOfPeople,
          this.ticketRegistrationDate);
    this.tickets.push(ticket);
    
    this.cancelTicket();

  }

  deleteTicket(id:string) {
    
    var r = confirm("Are you sure you want to delete " +
      this.ticketFirstName + " " + this.ticketLastName +"'s ticket? (Click OK for yes, or Cancel for no.)");
			if (r == true) {
			} else {
        this.cancelTicket();
			  return;
      }
      
    for (var i = 0; i<this.tickets.length; i++) {
      if (this.tickets[i].ticketId == id) {
        this.tickets.splice(i,1);
        break;
      }
    }
    this.crudService.deleteTicket(id);
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

    if (this.ticketDataIsInvalid()){
      return;
    }

    let record = {};
    
    record["ticketId"] = this.ticketId;
    record["ticketFirstName"] = this.ticketFirstName;
    record["ticketLastName"] = this.ticketLastName;
    record["ticketEmailAddress"] = this.ticketEmailAddress;
    record["ticketPhoneNumber"] = this.ticketPhoneNumber;
    record["ticketNumberOfPeople"] = this.ticketNumberOfPeople;
    record["ticketRegistrationDate"] = this.ticketRegistrationDate;

    this.crudService.updateTicket(this.ticketId,record);
    
    for (var i = 0; i<this.tickets.length; i++) {
      if (this.tickets[i].ticketId == this.ticketId) {
        this.ticketId = this.ticketId;
        this.tickets[i].ticketFirstName = this.ticketFirstName;
        this.tickets[i].ticketLastName = this.ticketLastName;
        this.tickets[i].ticketEmailAddress = this.ticketEmailAddress;
        this.tickets[i].ticketPhoneNumber = this.ticketPhoneNumber;
        this.tickets[i].ticketNumberOfPeople = this.ticketNumberOfPeople;
        this.tickets[i].ticketRegistrationDate = this.ticketRegistrationDate;
        break;
      }
    }

    this.editOnSwitch = false;
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

  emailIsInvalid(email: string){
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if(email.match(mailformat)){
        console.log(email + " is valid format.");
        return false;
      }
      else
      {
        console.log(email + " is not a valid format.");
        alert("Sorry, but your Contact Email does not appear to be in a valid format." +
          " Please correct.");
        return true;
      }
  }

  thereAreBlanks(name: string, label: string) {
    //var a = name.trim();
    if (!String.prototype.trim) {
      String.prototype.trim = function () {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
      };
    }

    var a = name.trim();
    if (a ==null || a == undefined) {
      alert(label + " cannot be blank. Please enter " + label + ".");
      return true;
    }
    else {
      let reg = /[a-z]/i;
      if(reg.test(name)) {
        return false;
      }
      alert(label + " must contain some alphabetic characters. Please re-enter " + 
        label + ".");
      return true;
    }
  }

  phoneNumberIsInvalid(name: string, label: string) {
    //var a = name.trim();
    if (!String.prototype.trim) {
      String.prototype.trim = function () {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
      };
    }

    var a = name.trim();
    //alert("carPhoneNumber = " + a);
    if (a == undefined || a == null || a.length < 10) {
      alert(label + " does not seem to have enough digits. Please re-enter " + label + ".");
      return true;
    } else {
      return false;
    }
    
  }

  ticketDataIsInvalid(){
    //Data Validation
    if( this.ticketFirstName == undefined ) { alert("Your First Name can not be blank. Please enter first name."); return true;}
    if( this.ticketLastName == undefined ) { alert("Your Last Name can not be blank. Please enter last name."); return true;}
    if( this.ticketEmailAddress == undefined ) { alert("Your Email Address can not be blank. Please enter email address."); return true;}
    if( this.ticketPhoneNumber == undefined ) { alert("Your Phone Number can not be blank. Please enter mobile phone number."); return true;}
    if( this.ticketNumberOfPeople == undefined ) { alert("The Number of People can not be blank. Please enter number of people attending."); return true;}

    if(this.thereAreBlanks(this.ticketFirstName, "Your First Name")) { return true; }
    if(this.thereAreBlanks(this.ticketLastName, "Your Last Name")) { return true; }
    if(this.thereAreBlanks(this.ticketEmailAddress, "Email Address")) { return true; }
    if(this.emailIsInvalid(this.ticketEmailAddress)) { return true; }
    
    if(this.phoneNumberIsInvalid(this.ticketPhoneNumber, "Your Moblie Phone Number")) { return true;}
    
    if( this.ticketNumberOfPeople < 0 || this.ticketNumberOfPeople == 0 ){
      alert("The number of people doesn't have to be exact, but must be an integer greater than 0.");
      return true;
    }
    if (this.ticketNumberOfPeople === parseInt(this.ticketNumberOfPeople.toString(), 10)){
      //alert("number of people is integer.")
    }
    else{
      //alert("number of people is not an integer.")
      alert("The number of people doesn't have to be exact, but must be an integer greater than 0.");
      return true;
    }
    //End of data validation
    return false;

  }

}
