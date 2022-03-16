import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {User, UserData} from "../../User";
import {UserService} from "../../services/user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  users!: User;
  usersData: UserData[] = []; // 取回的json里的user data保存在这里了
  subscription!: Subscription;
  search: string = '';

  constructor(private userService: UserService, public dialogRef: MatDialogRef<DialogComponent>) {
    this.subscription = this.userService.onUpdate().subscribe((value) => {
      // 返回对应id的元素已更新，显示update
      this.usersData[value - 1].update = true;
    })
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe((users) => {
      console.log(users);
      this.usersData = users.data;
    });
  }

  closeDialog() {
    this.dialogRef.close('Test!');
  }

  updateUser(userData: UserData) {
    this.userService.updateUser(userData).subscribe((userData) => console.log(userData));
  }

  // todo: encal
  deleteUser(userData: UserData) {
    this.userService.deleteUser(userData).subscribe(() =>
      this.usersData = this.usersData.filter((data) => data.id !== userData.id)
    );
  }

  // todo: 怎么 发送 实时输入的数据
  // todo: search component // 大小写
  searchUser() {
    this.usersData = this.usersData.filter((user) =>
      user.first_name.includes(this.search) || user.last_name.includes(this.search))
    // this.userService.searchUser(this.search);
  }
}
