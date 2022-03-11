import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserData} from "../../User";

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
  @Input() userData!: UserData;
  @Output() onUpdateUser: EventEmitter<UserData> = new EventEmitter();
  @Output() onDeleteUser: EventEmitter<UserData> = new EventEmitter<UserData>();
  fName!: string;
  lName!: string;
  email!: string;
  showUpdate: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.fName && !this.lName && !this.email) {
      alert('Please enter at least one item!')
      return
    }

    // todo 如果input里没有输入值的话，数据类型是undefined => 要处理成''吗？
    if (!this.fName)
      this.fName = '';
    if (!this.lName)
      this.lName = '';
    if (!this.email)
      this.email = '';

    const newUserData: UserData = {
      email: this.email,
      first_name: this.fName,
      last_name: this.lName,
    }
    this.onUpdateUser.emit(newUserData);

    this.fName = '';
    this.lName = '';
    this.email = '';
  }

  onDelete(userData: UserData) {
    this.onDeleteUser.emit(userData);
  }

  toggleUpdate() {
    this.showUpdate = !this.showUpdate;
  }
}
