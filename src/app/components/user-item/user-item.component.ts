import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../User";
import {UserService} from "../../services/user.service";
import {Subscription} from "rxjs";
import {FileUploadService} from "../../services/file-upload.service";

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
  @Input() user: User | null = null;
  @Output() onDeleteUser: EventEmitter<User> = new EventEmitter<User>();
  showUpdate: boolean = false;
  searchSubscription: Subscription;
  keyword: string = '';
  file: File | null = null; // Variable to store file
  previousAvatar: string = '';

  constructor(private userService: UserService, private fileUploadService: FileUploadService) {
    // 给highlightText pipe使用
    this.searchSubscription = this.userService.onSearch().subscribe((keyword) => {
      this.keyword = keyword;
    });
  }

  ngOnInit(): void {
  }

  // TODO Cancel update button
  onSubmit(): void {
    if (this.user === null) {
      console.log('User is null. Failed to submit any input.');
      return;
    }

    if (!this.user.first_name && !this.user.last_name && !this.user.email) {
      alert('Please enter at least one item!');
      return;
    }

    // TODO learn console object methods
    // if upload file successfully, change avatar and then update
    if (this.file) {
      console.log('Uploading avatar...');

      // this.fileUploadService.uploadFile(this.file, this.user.id).subscribe((url) => {
      //   try {
      //     console.log('Uploaded avatar url:', url);
      //     this.user!.avatar = url;
      //   } catch (error) {
      //     console.error('Failed to upload avatar', error);
      //   } finally {
      //     this.user!.avatar = this.previousAvatar;
      //     this.updateUser();
      //   }
      // });

      try {
        this.fileUploadService.uploadFile(this.file, this.user.id).subscribe((url) => {
          console.log('Uploaded avatar url:', url);
          this.user!.avatar = url;
        });
      } catch (error) {
        // todo do not execute
        console.error('Failed to upload avatar', error);
      } finally {
        // if failed to upload then assign previous value to avatar
        this.user.avatar = this.previousAvatar;
        this.updateUser();
      }
      // otherwise, update normally
    } else {
      this.updateUser();
    }
  }

  private updateUser() {
    console.log('Updating User:', this.user);

    // 直接在这里处理update的信息
    this.userService.updateUser(this.user!).subscribe((response) => {
      console.log('Updated User:', response);

      // 请求成功的话，告诉大家是哪个id的元素改变了
      // 直接在这里处理，不用再去userService的updateUser里了
      if (response.id === undefined) {
        console.log('Failed to update user!');
      } else {
        if (this.user!.id === response.id)
          this.user!.update = true;
      }
    });
  }

  onDelete(user: User): void {
    this.onDeleteUser.emit(user);
  }

  toggleUpdate(): void {
    this.showUpdate = !this.showUpdate;
  }

  onFileSelected(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (!files || !files) {
      console.log('Nothing selected!')
      return;
    }

    console.log('Image mime type:', files[0].type);
    if (files[0].type !== 'image/gif' && files[0].type !== 'image/jpeg' && files[0].type !== 'image/png') {
      alert('Invalid image file!');
      return;
    }

    this.file = files[0];

    // read local image
    this.previousAvatar = this.user!.avatar;
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      // assign url to avatar
      this.user!.avatar = e.target!.result as string;
    }
    fileReader.readAsDataURL(this.file);
  }
}
