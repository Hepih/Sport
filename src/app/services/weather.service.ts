
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
 weatherURL:string="http://localhost:3000/weather"


  constructor(private http: HttpClient) { }
   //request : Boolean 
   searchWeatherByAdresse(obj:any){
    return this.http.post<{ weather: any}>(this.weatherURL,obj);
  }

  // getSearchWeather(city:string){
  //  return this.http.get(`${this.weatherURL}/${city}`);
  // }
}