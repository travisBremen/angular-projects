import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../User";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = "https://reqres.in/api/users"

  constructor(private http: HttpClient) {
  }

  getUser(): Observable<User> {
    return this.http.get<User>(this.apiUrl);
  }
}
