import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { allMatches } from 'src/app/data/matchesData';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  title: string = "Search";
  searchForm: FormGroup;
  matches: any = allMatches;
  results:any=[];
  

  constructor(private result: FormBuilder ,
    private mService : MatchService) { }

  ngOnInit() {
    this.searchForm = this.result.group({
      search: ['', [Validators.required]]
    });
  }

  search() {
     const number = this.searchForm.value.search; 

    // this.results= this.matches.filter((obj: any) => {
    //   return obj.scoreTwo==number || obj.scoreOne==number
    //     ;
    // });
    this.mService.searchMatchesByScores(number).subscribe((response)=>{
      console.log("here response from BE", response.isFounded);
      this.results= response.isFounded;
    })



  }
}