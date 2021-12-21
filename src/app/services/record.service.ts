import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Records } from "../content/records";
import { AuthService } from "../users/login/auth.service";


@Injectable({
  providedIn: 'root'
})
export class RecordService {


  urlEndPoint:string='http://localhost:8080/api/v2/records';

  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})


  constructor(private http:HttpClient, private authService:AuthService){}


  agregarAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }


  getRecords():Observable<Records[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map((response)=>response as Records[])
    );
  }

  create(record: Records) : Observable<Records> {
    return this.http.post<Records>(this.urlEndPoint, record, { headers: this.agregarAuthorizationHeader() })
  }

  getRecord(id:number): Observable<Records>{
    return this.http.get<Records>(`${this.urlEndPoint}/${id}`, { headers: this.agregarAuthorizationHeader() })
  }

  update(record: Records): Observable<Records>{
    return this.http.put<Records>(`${this.urlEndPoint}/${record.id}`, record, { headers: this.agregarAuthorizationHeader() })
  }

  delete(id: number): Observable<Records>{
    return this.http.delete<Records>(`${this.urlEndPoint}/${id}`, { headers: this.agregarAuthorizationHeader() })
  }

  subirFoto(archivo: File, id:any): Observable<HttpEvent<any>>{

    let formData= new FormData();
    formData.append('archivo', archivo);
    formData.append('id', id);

    let httpHeaders= new HttpHeaders();
    let token= this.authService.token;
    if(token != null){
      httpHeaders= httpHeaders.append('Authorization', 'Bearer' + token);
    }

    const req= new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress:true,
      headers:httpHeaders
    });

    return this.http.request(req).pipe(resp=> resp);
  }

}
