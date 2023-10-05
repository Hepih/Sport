import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {
  title:string="Team-Form";
  teamForm:FormGroup ;
  
   team:any ={};


  constructor( private teamService :TeamService) { }
 
  ngOnInit() {
  }
  addTeam(){
    console.log("here team object",this.team);
    this.teamService.addTeam(this.team).subscribe((response)=>{
      console.log("here add  team",response);

    })

  }

}