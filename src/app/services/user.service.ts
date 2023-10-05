import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
userURL:string="http://localhost:3000/users"
  constructor(private http:HttpClient) { }
//user={firstName , lastName , tel , email , pwd}
  signup(user:any , file:File){
    let formData = new FormData();
    formData.append("firstName",user.firstName);
    formData.append("lastName",user.lastName);
    formData.append("email",user.email);
    formData.append("pwd",user.pwd);
    formData.append("role",user.role);
    formData.append("img",file);

   return this.http.post<{ msg: boolean}>(this.userURL+"/signup",formData);
  }
  //user={ email , pwd}
  login(user:any){
    return this.http.post<{token:string ; msg: string}>(this.userURL+"/login",user);
  }
  editProfile(user:any){
    return this.http.put(this.userURL,user);

  }
  displayProfile(email:any){
   return this. http.get(this.userURL+"/"+email)

  }
  deleteUserById(id:number){
    return this.http.delete(this.userURL +'/'+id);

  }
  getAllUsers(){
    return this.http.get(this.userURL);

  }
}
