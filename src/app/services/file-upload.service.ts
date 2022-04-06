import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {WebService} from "./web.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private imgUrl = this.webService.getRequestUrl() + 'img';

  constructor(private webService: WebService, private http: HttpClient) {
  }

  // TODO return type
  uploadFile(file: File, userId: number): Observable<any> {
    const url = this.imgUrl + '?id=' + userId;
    const formData = new FormData();
    formData.append("avatar", file, file.name);
    return this.http.post(url, formData);
    // return this.http.post<>(url, formData);
  }
}
