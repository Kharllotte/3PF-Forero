import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Course } from 'src/app/utils/interfaces/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  API = 'https://64644d9e127ad0b8f89bde0f.mockapi.io';

  constructor(private http: HttpClient) { }

  getListCourse(): Observable<Course[]>{
    return this.http.get<Course[]>(`${this.API}/courses`)
    .pipe(map((response: Course[]) => {
      return response;
    }))
  }

  getCourseId(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.API}/courses/${id}`)
      .pipe(map((response: Course) => {
        return response;
      }));
  }

  putCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.API}/courses/${course.id}`, course);
  }

  postCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${this.API}/courses`, course);
  }

  deleteCourse(id: number): Observable<Course> {
    return this.http.delete<Course>(`${this.API}/courses/${id}`);
  }


}
