import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {User} from "../User";
import {WebService} from "./web.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public subjectUpdate = new Subject<number>();
  public subjectSearch = new Subject<string>();
  private usersPath = this.webService.getRequestUrl() + 'users';

  constructor(private webService: WebService, private http: HttpClient) {
  }

  // *user的东西user管，不用放到web service里面
  getUser(): Observable<User[]> {
    return this.http.get<User[]>(this.usersPath);
  }

  updateUser(user: User): Observable<User> {
    const url = this.usersPath + '/' + user.id;
    return this.http.put<User>(url, user, this.webService.getHeader());
  }

  deleteUser(user: User): Observable<User> {
    const url = this.usersPath + '/' + user.id;
    return this.http.delete<User>(url);
  }

  createUser(user: User): Observable<User> {
    const url = this.usersPath + '/' + user.id;
    return this.http.post<User>(url, user, this.webService.getHeader());
  }

  onUpdate(): Observable<number> {
    return this.subjectUpdate.asObservable();
  }

  onSearch(): Observable<string> {
    return this.subjectSearch.asObservable();
  }
}
