import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SentimentService {
  private apiUrl = 'http://localhost:8000/analyze'; // Cambia esta URL por la de tu API

  constructor(private http: HttpClient) {}

  analyzeSentiment(message: string): Observable<any> {
    return this.http.post(this.apiUrl, { text: message });
  }
}

