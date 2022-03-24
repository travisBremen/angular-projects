import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../User";
import {UserService} from "../../services/user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
  @Input() user: User | null = null;
  @Output() onDeleteUser: EventEmitter<User> = new EventEmitter<User>();
  showUpdate: boolean = false;
  updateSubscription: Subscription;
  searchSubscription: Subscription;
  keyword: string = '';

  constructor(private userService: UserService) {
    this.updateSubscription = this.userService.onUpdate().subscribe((id) => {
      if (this.user === null) {
        console.log('User is null. Failed to show updated.');
      } else {
        if (this.user.id === id)
          this.user.update = true;
      }
    });

    // 给highlightText pipe使用
    this.searchSubscription = this.userService.onSearch().subscribe((keyword) => {
      this.keyword = keyword;
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.user === null) {
      console.log('User is null. Failed to submit any input.');
      return;
    }

    if (!this.user.first_name && !this.user.last_name && !this.user.email) {
      alert('Please enter at least one item!')
      return
    }

    // 直接在这里处理update的信息
    this.userService.updateUser(this.user).subscribe((response) => {
      console.log(response);
      // 请求成功的话，告诉大家是哪个id的元素改变了
      // 直接在这里处理，不用再去userService的updateUser里了
      if (response.id === undefined) {
        console.log('Failed to update user!');
      } else {
        this.userService.subjectUpdate.next(response.id);
      }
    });
  }

  onDelete(user: User): void {
    this.onDeleteUser.emit(user);
  }

  toggleUpdate(): void {
    this.showUpdate = !this.showUpdate;
  }
}
