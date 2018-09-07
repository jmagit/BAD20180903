import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export class BaseDAOService {
  protected baseUrl: string;

  constructor(protected http: HttpClient, urlBase: string,
    protected opciones: any) {
      this.baseUrl = environment.API_REST + urlBase;
    }
  query(): Observable<any> {
    return this.http.get(this.baseUrl, this.opciones);
  }
  get(id: any) {
    return this.http.get(this.baseUrl + '/' + id, this.opciones);
  }
  add(item: any) {
    return this.http.post(this.baseUrl, item, this.opciones);
  }
  change(item: any) {
    return this.http.put(this.baseUrl, item, this.opciones);
  }
  remove(id: any) {
    return this.http.delete(this.baseUrl + '/' + id, this.opciones);
  }
}
