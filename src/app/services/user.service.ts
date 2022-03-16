import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {User, UserData} from "../User";
import {HttpClient, HttpHeaders} from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = "https://reqres.in/api/users"
  public subjectUpdate = new Subject<any>();
  public subjectSearch = new Subject<any>();

  constructor(private http: HttpClient) {
  }

  getUser(): Observable<User> {
    return this.http.get<User>(this.apiUrl);
  }

  updateUser(userData: UserData): Observable<UserData> {
    const url = `${this.apiUrl}/${userData.id}`
    return this.http.put<UserData>(url, userData, httpOptions);
  }

  deleteUser(userData: UserData): Observable<UserData> {
    const url = `${this.apiUrl}/${userData.id}`
    return this.http.delete<UserData>(url);
  }

  createUser(userData: UserData): Observable<UserData> {
    return this.http.post<UserData>(this.apiUrl, userData, httpOptions);
  }

  onUpdate(): Observable<any> {
    return this.subjectUpdate.asObservable();
  }

  // searchUser(search: string) {
  //   this.subjectSearch.next(search);
  // }
  //
  // onSearch(): Observable<any> {
  //   return this.subjectSearch.asObservable();
  // }
}
