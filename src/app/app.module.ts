import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from "@angular/material/dialog";
import {HttpClientModule} from "@angular/common/http";

import {AppComponent} from './app.component';
import {BodyComponent} from './body/body.component';
import {ButtonComponent} from './button/button.component';
import {HeadComponent} from './head/head.component';
import {FootComponent} from './foot/foot.component';
import {DialogComponent} from './dialog/dialog.component';
import {UserItemComponent} from './user-item/user-item.component';
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    ButtonComponent,
    HeadComponent,
    FootComponent,
    DialogComponent,
    UserItemComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
