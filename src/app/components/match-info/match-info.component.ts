import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { allMatches } from 'src/app/data/matchesData';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-match-info',
  templateUrl: './match-info.component.html',
  styleUrls: ['./match-info.component.css']
})
export class MatchInfoComponent implements OnInit {
  matchId: any;
  matches: any = allMatches;
  findedMatch: any;
  constructor(private activatedRoute: ActivatedRoute,
    private mService: MatchService) { }

  ngOnInit() {
    this.matchId = this.activatedRoute.snapshot.paramMap.get('id');
    // for (let i = 0; i < this.matches.length; i++) {
    //   if(this.matches[i].id==this.matchId) {
    //     this.findedMatch=this.matches[i];
    //     break;

    //   }

    // }
    this.mService.getMatchById(this.matchId).subscribe((response) => {
      console.log("here response from BE", response);
      this.findedMatch = response.match;
    })
  }

}
