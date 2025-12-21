import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface ZipCloudResult {
  address1: string; // prefecture
  address2: string; // city
  address3: string; // town
}

@Injectable({providedIn: 'root'})
export class PostalCodeService {
  private readonly API =
    'https://zipcloud.ibsnet.co.jp/api/search';

  constructor(private http: HttpClient) {
  }

  lookup(postalCode: string): Observable<any> {
    const cleanCode = postalCode.replace(/-/g, '');
    return this.http.get<any>(`${this.API}?zipcode=${cleanCode}`);
  }
}
