import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TicketsComponent } from '../app/tickets/tickets.component';

@NgModule({
  declarations: [
    TicketsComponent
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [],
  bootstrap: [TicketsComponent]
})
export class AppModule { }
