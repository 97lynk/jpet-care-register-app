import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductVaccine} from "../models/product-vaccine.model";

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private readonly API = 'http://localhost:8765/public/products';

  constructor(private http: HttpClient) {
  }

  getAllProduct(): Observable<any> {
    return this.http.get<ProductVaccine[]>(this.API);
  }
}
