import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class indexService {
  constructor(private _httpClient: HttpClient) {}
  postLancamento(lan: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.post(`http://localhost:3000/index`, lan).subscribe(
        (res) => resolve(res),
        (err) => reject(err)
      );
    });
  }
}
