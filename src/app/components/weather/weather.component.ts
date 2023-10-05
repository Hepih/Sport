import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  weatherForm:FormGroup;
  title:string="search weather";
  search: any = null;

  constructor(private formBuilder:FormBuilder , private wServere:WeatherService) { }

  ngOnInit() {
    this.weatherForm=this.formBuilder.group({
      city:['',[Validators.required,Validators.minLength(3)]],

    })
  }
  searchWeather(){
  
    this.wServere.searchWeatherByAdresse(this.weatherForm.value).subscribe((response)=>{
      console.log("here response from BE", response.weather);
      this.search=response.weather;
      
    });
    //  this.wServere.getSearchWeather(this.weatherForm.value.city).subscribe();

  }

}
