import {Injectable} from '@angular/core';
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WebService {
  private apiUrl = "http://localhost:3000/";

  constructor() {
  }

  getRequestUrl() {
    return this.apiUrl;
  }

  getHeader() {
    return {
      headers: new HttpHeaders(
        {'Content-Type': 'application/json'}
      )
    };
  }
}
