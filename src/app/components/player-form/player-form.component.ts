import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { PlayerService } from 'src/app/services/player.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.css']
})
export class PlayerFormComponent implements OnInit {
  playerForm:FormGroup;
  title:string="Player-Form";
  teamsTab:any=[];
  teamId:any;
  imagePreview:string;
  constructor(private Y:FormBuilder , private teamService :TeamService , private playerService:PlayerService) { }

  ngOnInit() {
    this.teamService.getAllTeams().subscribe((response)=>{
      console.log("here is response from BE",response);
      this.teamsTab  =response.teams;
    })
    this.playerForm=this.Y.group({
      namee:['',[Validators.required,Validators.minLength(3)]],
      age:[''],
      nbr:[''],
      position:[''],
      img:['']


    }

    )
  }

  addOrEditPlayer(){
    console.log('here  player ',this.playerForm.value);
     this.playerForm.value.tId=this.teamId;
     this.playerService.aadPlayer(this.playerForm.value,this.playerForm.value.img).subscribe((response)=>{
      console.log("here is response from BE :",response);
      
     })
  }
  selectTeamId(event){
     console.log("here event",event.target.value);
     this.teamId=event.target.value;
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log("here selected file",file);
    //inser file fi attribut img
     this.playerForm.patchValue({ img: file });
    //updateValueAndValidity() taaml mise a jour (refresh)
    this.playerForm.updateValueAndValidity();
    // FileReader() une instance de reader  yaatini path de fichier selectionée 
     const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
   }
}