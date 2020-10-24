import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovableBoxModule } from './movable-box/movable-box.module';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MovableBoxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
