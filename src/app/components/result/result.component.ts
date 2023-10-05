import { Component, Input, OnInit ,Output,EventEmitter } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
@Input() X:any;
@Output() newMatches : EventEmitter<any> = new EventEmitter();
user:any;
  constructor(private matchService:MatchService) { }

  ngOnInit() {
    const jwt = sessionStorage.getItem('token');
    if (jwt) {
      this.user=this.decodeJWT(jwt);
      console.log("here decoded user",this.user);
      
    }
  }
  scoreColor(sc1 :number ,sc2: number){
    if (sc1>sc2) {
      return ["green","Win"];
    } else if (sc1<sc2){
      return ["orange", "Loss"];
    }else{
      return ["blue","Draw"];
    }
  }


  deleteMatch(id){
    this.matchService.deleteMatchById(id).subscribe((response)=>{
      console.log("here response after delate ", response.isDeleted);
      if(response.isDeleted){
        this.matchService.displayAllMatches().subscribe((res)=>{
          console.log("here res from BE",res.matches);
          this.newMatches.emit(res.matches);
                });
      }
      
     });
  }
decodeJWT(token: string) {
  return jwt_decode(token);
  }
}