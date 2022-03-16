import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {
  search: string = '';

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
  }

  onSearch() {
    // 告知大家我要search的string
    this.userService.subjectSearch.next(this.search);
  }
}
