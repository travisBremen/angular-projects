import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {User, UserData} from "../../User";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  users!: User;
  // 取回的json里的user data保存在这里了
  usersData: UserData[] = [];

  constructor(private userService: UserService, public dialogRef: MatDialogRef<DialogComponent>) {
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

  // todo 两个参数可以吗
  updateUser(newUserData: UserData, oldUserData: UserData) {
    console.log('----------------------NEW user data---------------------')
    console.log(newUserData);
    console.log('----------------------OLD user data---------------------')
    console.log(oldUserData);
    this.userService.updateUser(newUserData).subscribe((userData) => {
      console.log(userData);

      // todo: 这里的逻辑该怎么写
      if (oldUserData.id !== undefined) {
        // 原来位置的数据
        const data = this.usersData[oldUserData.id - 1];

        // if any input is empty
        if (newUserData.email == '')
          data.email = oldUserData.email;
        else
          data.email = userData.email;

        if (newUserData.first_name == '')
          data.first_name = oldUserData.first_name;
        else
          data.first_name = userData.first_name;

        if (newUserData.last_name == '')
          data.last_name = oldUserData.last_name
        else
          data.last_name = userData.last_name;
      }
    });
    console.log('Update user info successfully')
  }

  // todo delete user
  deleteUser(userData: UserData) {
    this.userService.deleteUser(userData).subscribe(() =>
      this.usersData = this.usersData.filter((data) => data.id !== userData.id)
    );
  }
}
