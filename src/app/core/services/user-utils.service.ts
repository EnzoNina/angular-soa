import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserUtilsService {
    private userUrl = environment.users_url;
    // private userUrl = `${environment.gateway}` + 'api/usuario';

    constructor(private http: HttpClient) { }

    // Obtener un usuario por ID
    getUserById(userId: string): Observable<any> {
        return this.http.get(`${this.userUrl}/${userId}`).pipe(
            tap(response => console.log('Usuario obtenido:', response))
        );
    }

    findUserByEmail(email: string): Observable<any> {
        const url = `${this.userUrl}/email?email=${email}`;
        return this.http.get<any>(url);
    }
}