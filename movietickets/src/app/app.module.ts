import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// >npm install --save firebase @angular/fire //
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';


import { TicketsComponent } from '../app/tickets/tickets.component';

@NgModule({
  declarations: [
    TicketsComponent
  ],
  imports: [
    BrowserModule, FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [TicketsComponent]
})
export class AppModule { }
