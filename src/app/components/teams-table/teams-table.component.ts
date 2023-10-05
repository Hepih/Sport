import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teams-table',
  templateUrl: './teams-table.component.html',
  styleUrls: ['./teams-table.component.css']
})
export class TeamsTableComponent implements OnInit {
  teams:any[];
  constructor() { }

  ngOnInit() {
    this.teams=[
      {id:1,name:"FCD",owner:"mohamed",fondation:1970,stadium:"cap new"},
      {id:1,name:"RMD",owner:"ali",fondation:1980,stadium:"bizerte"},
      {id:1,name:"CA",owner:"salah",fondation:1920,stadium:"Rades"},
    ]
  }

}
