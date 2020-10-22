export class Ticket {
    id: string;
    ticketFirstName: string;
    ticketLastName: string;
    ticketEmailAddress: string;
    ticketPhoneNumber: string;
    ticketNumberOfPeople: number;
    ticketRegistrationDate: number;
    constructor(id: string, ticketFirstName: string, ticketLastName: string,
        ticketEmailAddress: string, ticketPhoneNumber: string,
        ticketNumberOfPeople: number, 
        ticketRegistrationDate: number) {
        this.id = id;
        this.ticketFirstName = ticketFirstName;
        this.ticketLastName = ticketLastName;
        this.ticketEmailAddress = ticketEmailAddress;
        this.ticketPhoneNumber = ticketPhoneNumber;
        this.ticketNumberOfPeople = ticketNumberOfPeople;
        this.ticketRegistrationDate = ticketRegistrationDate;
    }
}