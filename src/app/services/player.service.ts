import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
playerURL:string="http://localhost:3000/api/players"
  constructor(private http:HttpClient) { }

 //request : Array of Objects 
 displayAllPlayers(){
  return this.http.get(this.playerURL);
 }
//request :one object 
 getPlayerById(id:number){
  return this.http.get(`${this.playerURL}/${id}`);

 }
//request : Boolean 
aadPlayer(obj:any  , file:File){
  let formData = new FormData();
  formData.append("player Name ",obj.namee);
  formData.append("player age ",obj.age);
  formData.append("player Number ",obj.nbr);
  formData.append("player position ",obj.position);
  formData.append("img",file);

  return this.http.post<{isAdded:boolean}>(this.playerURL,formData);
}
//request : Boolean 
deletePlayerById(id:number){
  return this.http.delete(`${this.playerURL}}/${id}`);
}
//request : Boolean /String 
editPlayer(obj:any){
  return this.http.put(this.playerURL,obj);
}



}
