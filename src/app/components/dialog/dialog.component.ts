import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {User} from "../../User";
import {UserService} from "../../services/user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  users: User[] = []; // 取回的json里的user data保存在这里了
  existedUser: User[] = []; // 用来存放没被删除的数据
  temStr: string = ''; // 保存当前搜索的关键字
  subscription: Subscription;
  showNoResults: boolean = false;

  constructor(private userService: UserService, public dialogRef: MatDialogRef<DialogComponent>) {
    this.subscription = this.userService.onSearch().subscribe((keyword) => {
      // 在现存的data中filter关键字
      this.users = this.existedUser.filter((user) =>
        user.first_name.includes(keyword) || user.last_name.includes(keyword));

      // 临时保存搜索的关键字
      this.temStr = keyword;

      // 显示/隐藏no results
      this.showNoResults = this.users.length === 0;
    });
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe((users) => {
      console.log(users);
      try {
        this.users = users;
        this.existedUser = users;
      } catch (error) {
        console.error('Failed to get user list from the endpoint.', error);
      }
    });
  }

  closeDialog(): void {
    this.dialogRef.close('Test!');
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user).subscribe(() => {
      // 展示的data => 没被删除且包含搜索关键字的数据
      this.users = this.existedUser.filter((data) =>
        data.id !== user.id
        && (data.first_name.includes(this.temStr) || data.last_name.includes(this.temStr))
      );

      // 删除后实际的data
      this.existedUser = this.existedUser.filter((data) => data.id !== user.id);

      // 这时的展示也要考虑no results
      this.showNoResults = this.users.length === 0;
    });
  }
}
