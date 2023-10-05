import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  teamUrl:string="http://localhost:3000/teams";

  constructor( private httpClient : HttpClient) { }

  addTeam(obj){
    return this.httpClient.post<{isadded: boolean }>(this.teamUrl,obj);
  }
  getAllTeams(){
    return this.httpClient.get<{teams:any}>(this.teamUrl);
  }
}
