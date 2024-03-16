import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private urlBase = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {}

  getResponse(response: string): Observable<string> {
    return this.httpClient.get(`${this.urlBase}/bot/chat?prompt=${response}`, { responseType: 'text' });
  }
}
