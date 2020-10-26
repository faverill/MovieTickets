import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CrudRepository } from './services/crud.repository';
//import { CrudService } from './services/crud.service';

// >npm install --save firebase @angular/fire //
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';


import { TicketsComponent } from '../app/tickets/tickets.component';
import { LoggingComponent } from '../app/logging/logging.component';
import { RouterModule } from '@angular/router';
import { AuthService } from '../app/services/auth.service';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent, TicketsComponent, LoggingComponent
  ],
  imports: [
    BrowserModule, FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    RouterModule.forRoot([
      {path:"logging",component:LoggingComponent},  
      {path:"tickets",component:TicketsComponent},
      {path:"**",redirectTo:"logging"}
    ])
  ],
  providers: [CrudRepository,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
