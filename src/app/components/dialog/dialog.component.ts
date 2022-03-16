import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {UserData} from "../../User";
import {UserService} from "../../services/user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  usersData: UserData[] = []; // 取回的json里的user data保存在这里了
  existedData: UserData[] = []; // 用来存放没被删除的数据
  temStr: string = ''; // 保存当前搜索的关键字
  subscription: Subscription;
  showNoResults: boolean = false;

  constructor(private userService: UserService, public dialogRef: MatDialogRef<DialogComponent>) {
    this.subscription = this.userService.onSearch().subscribe((keyword) => {
      // 在现存的data中filter关键字
      this.usersData = this.existedData.filter((user) =>
        user.first_name.includes(keyword) || user.last_name.includes(keyword));

      // 临时保存搜索的关键字
      this.temStr = keyword;

      this.showNoResults = this.usersData.length === 0;
    });
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe((users) => {
      console.log(users);
      this.usersData = users.data;
      this.existedData = users.data;
    });
  }

  closeDialog(): void {
    this.dialogRef.close('Test!');
  }

  // todo: 每个:void也要显示指明吗
  deleteUser(userData: UserData): void {
    this.userService.deleteUser(userData).subscribe(() => {
      // 展示的data => 没被删除且包含搜索关键字的数据
      this.usersData = this.existedData.filter((data) =>
        data.id !== userData.id
        && (data.first_name.includes(this.temStr) || data.last_name.includes(this.temStr))
      );

      // 删除后实际的data
      this.existedData = this.existedData.filter((data) => data.id !== userData.id);
    });
  }
}
