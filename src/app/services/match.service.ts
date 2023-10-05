import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
 // matchURL :Backend Adress 
  matchURL:string="http://localhost:3000/matches"
 //http : c'set notre livreur  / Bostagi
  constructor(private http: HttpClient) { }

  //request : Array of Objects 
  displayAllMatches(){
    return this.http.get<{matches: any}>(this.matchURL);
   }
  //request :one object 
   getMatchById(id:number){
    return this.http.get<{match:any}>(`${this.matchURL}/${id}`);

   }
  //request : Boolean 
  aadMatch(obj:any){
    return this.http.post<{isadded : boolean}>(this.matchURL,obj);
  }
  //request : Boolean 
  deleteMatchById(id:number){
    return this.http.delete<{isDeleted:boolean}>(`${this.matchURL}/${id}`);
  }
  //request : Boolean /String 
  editMatch(obj:any){
    return this.http.put<{isUpdated:boolean}>(this.matchURL,obj);
  }
  
  searchMatchesByScores(score:number){
    return this.http.get<{isFounded: any}>(`${this.matchURL}/search/${score}`);
  } 
  

}
