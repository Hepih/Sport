import { Component, OnInit } from '@angular/core';
//import { allMatches } from 'src/app/data/matchesData';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  matches:any[];
  title:string="Matches";

  constructor(private mService : MatchService) { }

  ngOnInit() {
    // this.matches=allMatches;
    this.mService.displayAllMatches().subscribe((matchesResponse)=>{
      console.log("here matchesResponses",matchesResponse.matches);
       this.matches=matchesResponse.matches;
    });
   
  }
  updateMatches(T){
     this.matches=T;
  }

}
