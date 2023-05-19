import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Course } from 'src/app/utils/interfaces/course';
import { Inscription } from 'src/app/utils/interfaces/inscription';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  // API = 'https://645ef9079d35038e2d1ad475.mockapi.io';
  API = 'https://6466d8972ea3cae8dc1ff00e.mockapi.io';

  constructor(private http: HttpClient) { }

  getListInscription(): Observable<Inscription[]>{
    return this.http.get<Inscription[]>(`${this.API}/inscribir`)
    .pipe(map((response: Inscription[]) => {
      return response;
    }))
  }

  getInscriptionId(id: number): Observable<Inscription> {
    return this.http.get<Inscription>(`${this.API}/inscribir/${id}`)
      .pipe(map((response: Inscription) => {
        return response;
      }));
  }

  getInscriptionByStudentId(id: number): Observable<Inscription[]> {
    return this.http.get<Inscription[]>(`${this.API}/inscribir?student=${id}`);
  }

  putInscription(inscription: Inscription): Observable<Inscription> {
    return this.http.put<Inscription>(`${this.API}/inscribir/${inscription.id}`, inscription);
  }

  postInscription(inscription: Inscription): Observable<Inscription> {
    return this.http.post<Inscription>(`${this.API}/inscribir`, inscription);
  }

  deleteInscription(id: number): Observable<Inscription> {
    return this.http.delete<Inscription>(`${this.API}/inscribir/${id}`);
  }


}
