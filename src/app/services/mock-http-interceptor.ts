import {HttpEvent, HttpHandlerFn, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';
import {db} from './mock-data'; // Import the mock data

// --- Functional Interceptor ---
export function mockHttpInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const { url, method, body } = req;

  const createResponse = (responseBody: any, status = 200) => {
    return of(new HttpResponse({ status, body: responseBody })).pipe(delay(500));
  };

  // Handle GET for products
  if (url.endsWith('/public/products') && method === 'GET') {
    console.log('Mock API: Intercepted GET /public/products');
    return createResponse(db.products);
  }

  // Handle GET for prefectures
  if (url.endsWith('/public/appointments/prefectures') && method === 'GET') {
    console.log('Mock API: Intercepted GET /public/appointments/prefectures');
    return createResponse(db.prefectures);
  }

  // Handle GET for locations by prefecture
  if (url.includes('/public/appointments/prefectures/') && url.endsWith('/locations') && method === 'GET') {
      const urlParts = url.split('/');
      const prefectureCode = urlParts[urlParts.length - 2];
      console.log(`Mock API: Intercepted GET /public/appointments/prefectures/${prefectureCode}/locations`);
      // @ts-ignore
      const locations = db.locations[prefectureCode];
      return createResponse(locations);
  }

  // Handle POST for vaccine registration
  if (url.endsWith('/public/vaccines/register') && method === 'POST') {
    console.log('Mock API: Intercepted POST /public/vaccines/register', body);
    return createResponse({ message: 'Mock registration successful!' });
  }

  // If no mock route is matched, pass the request through
  return next(req);
}
