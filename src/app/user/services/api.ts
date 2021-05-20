import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AddFavoritePayload, DeleteFavoritePayload , Favorite } from '@user/models';

import { environment } from 'src/environments/environment';

@Injectable()
export class FavoritesApiService {
  constructor(private http: HttpClient) {}

  public loadAll(username: string): Observable<Favorite[]> {
    console.log("username：" + username)
    const url = `${environment.apiUrl}/favorites/${username}`;
    return this.http.get<Favorite[]>(url);
  }

  public getById(id: string): Observable<Favorite> {
    const url = `${environment.apiUrl}/favorites/${id}`;
    return this.http.get<Favorite>(url);
  }

  public add(payload: AddFavoritePayload): Observable<Favorite> {
    console.log(payload);
    const url = `${environment.apiUrl}/favorites/add`;
    const formData = new FormData();
    formData.append('username', payload.username);
    formData.append('id', payload.id);
    formData.append('fav_type', payload.fav_type);
    formData.append('remark', payload.remark);
    formData.append('value', payload.value);
    return this.http.post<Favorite>(url, formData);
  }

  public deleteFavorite(payload : DeleteFavoritePayload) : Observable<Favorite> {
    console.log("username:" + payload.username)
    console.log("id:" + payload.id)
    const url = `${environment.apiUrl}/favorites/delete`;
    const formData = new FormData();
    formData.append('username', payload.username);
    formData.append('id', payload.id);
    return this.http.post<Favorite>(url, formData);
  }
}
