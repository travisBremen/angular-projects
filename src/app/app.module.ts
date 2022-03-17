import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from "@angular/material/dialog";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

import {AppComponent} from './app.component';
import {BodyComponent} from './components/body/body.component';
import {HeadComponent} from './components/head/head.component';
import {FootComponent} from './components/foot/foot.component';
import {DialogComponent} from './components/dialog/dialog.component';
import {UserItemComponent} from './components/user-item/user-item.component';
import {SearchUserComponent} from './components/search-user/search-user.component';
import { HighlightTextPipe } from './pipes/highlight-text.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    HeadComponent,
    FootComponent,
    DialogComponent,
    UserItemComponent,
    SearchUserComponent,
    HighlightTextPipe
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
