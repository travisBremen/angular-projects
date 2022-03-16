import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserData} from "../../User";
import {UserService} from "../../services/user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
  @Input() userData!: UserData;
  @Output() onDeleteUser: EventEmitter<UserData> = new EventEmitter<UserData>();
  showUpdate: boolean = false;
  subscription!: Subscription;

  constructor(private userService: UserService) {
    // this.subscription = this.userService.onSearch().subscribe((value) => {
    //   // todo: 如果字符串匹配，改变样式？
    //   console.log(value);
    // });
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
      // 请求成功的话，告诉大家是哪个id的元素改变了
      // 直接在这里处理，不用再去userService的updateUser里了
      this.userService.subjectUpdate.next(response.id);
    });
  }

  onDelete(userData: UserData) {
    this.onDeleteUser.emit(userData);
  }

  toggleUpdate() {
    this.showUpdate = !this.showUpdate;
  }
}
