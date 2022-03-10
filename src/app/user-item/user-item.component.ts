import {Component, Input, OnInit} from '@angular/core';
import {UserData} from "../User";

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
  @Input() userData!: UserData;

  constructor() {
  }

  ngOnInit(): void {
  }

}
