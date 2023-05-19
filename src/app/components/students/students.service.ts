import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Student } from 'src/app/utils/interfaces/student';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  // API = 'https://645ef9079d35038e2d1ad475.mockapi.io';
  API = 'https://64644d9e127ad0b8f89bde0f.mockapi.io';

  constructor(private http: HttpClient) { }


  getListStudent(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.API}/students`)
      .pipe(map((response: Student[]) => {
        return response;
      }));
  }

  getStudentId(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.API}/students/${id}`)
      .pipe(map((response: Student) => {
        return response;
      }));
  }

  putStudent(student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.API}/students/${student.id}`, student);
  }

  postStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.API}/students`, student);
  }

  deleteStudent(id: number): Observable<Student> {
    return this.http.delete<Student>(`${this.API}/students/${id}`);
  }



}