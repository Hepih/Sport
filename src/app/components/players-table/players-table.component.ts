import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.css']
})
export class PlayersTableComponent implements OnInit {
players:any[];
  constructor() { }

  ngOnInit() {
    this.players=[
      {id:1,name:"Ronalado",age:34,number:7,position:"attq"},
      {id:1,name:"messi",age:35,number:10,position:"middle"},
      
    ]
  }

}
