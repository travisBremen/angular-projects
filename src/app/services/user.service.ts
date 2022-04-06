import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {User} from "../User";
import {WebService} from "./web.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public subjectSearch = new Subject<string>();
  private usersUrl = this.webService.getRequestUrl() + 'api/users';

  constructor(private webService: WebService, private http: HttpClient) {
  }

  // TODO handle responses from server?
  // *user的东西user管，不用放到web service里面
  getUser(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  updateUser(user: User): Observable<User> {
    const url = this.usersUrl + '?id=' + user.id;
    return this.http.put<User>(url, user, this.webService.getHeader());
  }

  deleteUser(user: User): Observable<User> {
    const url = this.usersUrl + '?id=' + user.id;
    return this.http.delete<User>(url);
  }

  createUser(user: User): Observable<User> {
    const url = this.usersUrl + '?id=' + user.id;
    return this.http.post<User>(url, user, this.webService.getHeader());
  }

  onSearch(): Observable<string> {
    return this.subjectSearch.asObservable();
  }
}
