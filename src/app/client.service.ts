import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonConstants } from './CommonConstants';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http:HttpClient) { }

  getUserInfo(userId:string): Observable<any> {
    if(userId.indexOf('#')>=0)
      userId = userId.substring(userId.indexOf('#')+1);
    var obj =
    {
      "userName": userId,
      "isDigital":0
    }
    //var reqHeader = this.appendHeaders();
    var reqHeader = new HttpHeaders();
    reqHeader.append('contentType', 'application/json');

    let options = {
        headers: reqHeader
    };
    var reqObject = JSON.stringify(obj);
    return this.http.post<any>(CommonConstants.userInfoUrl, reqObject);
  }

}
