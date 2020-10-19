import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { TicketsComponent } from '../app/tickets/tickets.component';

@NgModule({
  declarations: [
    TicketsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [TicketsComponent]
})
export class AppModule { }
