import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserData} from "../../User";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
  // todo: 是这样初始化吗
  @Input() userData: UserData = {email: "", first_name: "", last_name: "", update: false};
  @Output() onDeleteUser: EventEmitter<UserData> = new EventEmitter<UserData>();
  showUpdate: boolean = false;

  constructor(private userService: UserService) {
    // this.subscription = this.userService.onSearch().subscribe((value) => {
    //   // todo: 如果字符串匹配，改变样式？
    //   console.log(value);
    // });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (!this.userData.first_name && !this.userData.last_name && !this.userData.email) {
      alert('Please enter at least one item!')
      return
    }

    // 直接在这里处理update的信息
    this.userService.updateUser(this.userData).subscribe((response) => {
      console.log(response);
      // 请求成功的话，告诉大家是哪个id的元素改变了
      // 直接在这里处理，不用再去userService的updateUser里了

      // todo: TS2345: Argument of type 'number | undefined' is not assignable to parameter of type 'number'.
      // todo: 为什么try catch没用？ => ErrorHandler
      try {
        this.userService.subjectUpdate.next(response.id!);
      } catch (error) {
        console.error('Here is the error message', error);
      }
    });
  }

  onDelete(userData: UserData): void {
    this.onDeleteUser.emit(userData);
  }

  toggleUpdate(): void {
    this.showUpdate = !this.showUpdate;
  }
}
