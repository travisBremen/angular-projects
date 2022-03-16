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
  subscription: Subscription;

  constructor(private userService: UserService, public dialogRef: MatDialogRef<DialogComponent>) {
    this.subscription = this.userService.onUpdate().subscribe((value) => {
      // 返回对应id的元素已更新，显示update
      this.usersData[value - 1].update = true;
    })
  }

  ngOnInit(): void {
    console.log(this.subscription);
    this.userService.getUser().subscribe((users) => {
      console.log(users);
      this.usersData = users.data;
    });
  }

  closeDialog(): void {
    this.dialogRef.close('Test!');
  }

  // todo: 每个:void也要显示指明吗
  deleteUser(userData: UserData): void {
    this.userService.deleteUser(userData).subscribe(() =>
      this.usersData = this.usersData.filter((data) => data.id !== userData.id)
    );
  }

  searchUser() {
    // this.usersData = this.usersData.filter((user) =>
    //   user.first_name.includes(this.search) || user.last_name.includes(this.search))
    // this.userService.searchUser(this.search);
  }
}
