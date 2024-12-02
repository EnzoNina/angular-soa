import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserUtilsService {
    private userUrl = environment.users_url;

    constructor(private http: HttpClient) { }

    findUserByEmail(email: string): Observable<any> {
        const url = `${this.userUrl}/email?email=${email}`;
        return this.http.get<any>(url);
    }
}