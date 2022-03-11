import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserData} from "../../User";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
  @Input() userData!: UserData;
  @Output() onDeleteUser: EventEmitter<UserData> = new EventEmitter<UserData>();
  showUpdate: boolean = false;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.userData.first_name && !this.userData.last_name && !this.userData.email) {
      alert('Please enter at least one item!')
      return
    }

    // 直接在这里处理update的信息
    this.userService.updateUser(this.userData).subscribe((response) => {
      console.log(response);
    });
  }

  onDelete(userData: UserData) {
    this.onDeleteUser.emit(userData);
  }

  toggleUpdate() {
    this.showUpdate = !this.showUpdate;
  }
}
