import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {User, UserData} from "../User";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  users!: User;
  userData: UserData[] = [];

  constructor(private userService: UserService, public dialogRef: MatDialogRef<DialogComponent>) {
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe((users) => {
      console.log(users);
      this.userData = users.data;
    });
  }

  closeDialog() {
    this.dialogRef.close('Test!');
  }
}
