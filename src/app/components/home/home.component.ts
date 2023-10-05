import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
match:any={id:1,teamOne:"est",teamTwo:"ca",scoreOne:3,scoreTwo:1};
  constructor() { }

  ngOnInit() {

  }

}
