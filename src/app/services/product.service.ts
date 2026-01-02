import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {VaccineProductDto} from '../models/product/product.dto';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private readonly API = 'http://localhost:8765/public/products';

  constructor(private http: HttpClient) { }

  getAllProduct(): Observable<VaccineProductDto[]> {
    return this.http.get<VaccineProductDto[]>(this.API);
  }
}
