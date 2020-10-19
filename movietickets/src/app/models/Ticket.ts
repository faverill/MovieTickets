export class Ticket {
    ticketId: string;
    ticketFirstName: string;
    ticketLastName: string;
    ticketEmailAddress: string;
    ticketPhoneNumber: string;
    ticketNumberOfPeople: number;
    ticketRegistrationDate: number;
    constructor(ticketId: string, ticketFirstName: string, ticketLastName: string,
        ticketEmailAddress: string, ticketPhoneNumber: string,
        ticketNumberOfPeople: number, 
        ticketRegistrationDate: number) {
        this.ticketId = ticketId;
        this.ticketFirstName = ticketFirstName;
        this.ticketLastName = ticketLastName;
        this.ticketEmailAddress = ticketEmailAddress;
        this.ticketPhoneNumber = ticketPhoneNumber;
        this.ticketNumberOfPeople = ticketNumberOfPeople;
        this.ticketRegistrationDate = ticketRegistrationDate;
    }
}