import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Song } from "../content/song";
import { AuthService } from "../users/login/auth.service";


@Injectable({
  providedIn: 'root'
})
export class SongService {


  urlEndPoint:string='http://localhost:8080/api/songs';

  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})


  constructor(private http:HttpClient, private authService:AuthService){}


  agregarAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }


  getSongs():Observable<Song[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map((response)=>response as Song[])
    );
  }

  create(song: Song) : Observable<Song> {
    return this.http.post<Song>(this.urlEndPoint, song, { headers: this.agregarAuthorizationHeader() })
  }

  getSong(id:number): Observable<Song>{
    return this.http.get<Song>(`${this.urlEndPoint}/${id}`, { headers: this.agregarAuthorizationHeader() })
  }

  update(song: Song): Observable<Song>{
    return this.http.put<Song>(`${this.urlEndPoint}/${song.id}`, song, { headers: this.agregarAuthorizationHeader() })
  }

  delete(id: number): Observable<Song>{
    return this.http.delete<Song>(`${this.urlEndPoint}/${id}`, { headers: this.agregarAuthorizationHeader() })
  }


}
