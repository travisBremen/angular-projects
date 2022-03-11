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

  updateUser(userData: UserData) {
    this.userService.updateUser(userData).subscribe((userData) =>
      console.log(userData)
    );
  }

  deleteUser(userData: UserData) {
    this.userService.deleteUser(userData).subscribe(() =>
      this.usersData = this.usersData.filter((data) => data.id !== userData.id)
    );
  }
}
