import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatSelectModule, MatCardModule, MatListModule, MatToolbarModule, MatSlideToggleModule } from '@angular/material';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

const config = {
  piKey: "AIzaSyD8CbP19Y-m21K9tw312d0t9g1qR56Leig",
  authDomain: "utk-voting-app.firebaseapp.com",
  databaseURL: "https://utk-voting-app.firebaseio.com",
  projectId: "utk-voting-app",
  storageBucket: "utk-voting-app.appspot.com",
  messagingSenderId: "893430595715"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    MatButtonModule, MatListModule, MatSelectModule, MatCardModule,
    MatToolbarModule, MatSlideToggleModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
