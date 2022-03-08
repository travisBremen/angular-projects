import {Component, OnInit} from '@angular/core';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {faMicrophone} from '@fortawesome/free-solid-svg-icons';
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  faSearch = faSearch;
  faMicrophone = faMicrophone;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  getUser() {
    console.log('get user!')
    this.openDialog();
  }

  openDialog(): void {
    console.log('haasdfasasasasasasasasasasasas');
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '600px',
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    console.log('dgf55555555555555555555555555');
  }
}
