import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {

  private readonly API = 'http://localhost:8765/public/vaccines/register';

  constructor(private http: HttpClient) { }

  register(request: any): Observable<any> {
    console.log('public/vaccines/register', request);
    return this.http.post(this.API, request);
  }
}
