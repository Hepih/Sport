import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-match-form',
  templateUrl: './match-form.component.html',
  styleUrls: ['./match-form.component.css']
})
export class MatchFormComponent implements OnInit {

  matchForm: FormGroup;
  match: any = {};
  btnTitle: string = "Add Match";
  matchId: any;
  matchesTable: any;
  constructor(private activatedRoute: ActivatedRoute, private mService: MatchService , private router : Router) { }

  ngOnInit() {

    this.matchId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.matchId) {
      this.btnTitle = "Edit Match";
      this.mService.getMatchById(this.matchId).subscribe((response) => {
        console.log("here response update match From BE", response.match)
        this.match = response.match;
        
      });
    }

  }
  addOrEditMatch() {
    console.log("this match", this.match);
    if (this.matchId) {
      this.mService.editMatch(this.match).subscribe((response) => {
        console.log("here reponse Add Match from BE", response.isUpdated);
        this.router.navigate(["admin"]);
      });
    } else {
      this.mService.aadMatch(this.match).subscribe((response) => {
        console.log("here reponse Edit Match from BE", response.isadded);
      });
    }

  }

}