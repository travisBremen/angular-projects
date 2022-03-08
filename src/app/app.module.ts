import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { ButtonComponent } from './button/button.component';
import { HeadComponent } from './head/head.component';
import { FootComponent } from './foot/foot.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DialogComponent } from './dialog/dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    ButtonComponent,
    HeadComponent,
    FootComponent,
    DialogComponent
  ],
    imports: [
        BrowserModule,
        FontAwesomeModule,
        BrowserAnimationsModule,
        MatDialogModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
