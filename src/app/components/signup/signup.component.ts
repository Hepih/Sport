import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MustMatch } from 'src/app/validators/mustMatch';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm:FormGroup;
  title:string="Signup";
  errorMsg:string;
  path:any;
  imagePreview:string;
  constructor(private formBuilder:FormBuilder, private userService:UserService, private router:Router) {}
    
  ngOnInit() {
    this.path=this.router.url;

    this.signupForm=this.formBuilder.group({
      firstName:['',[Validators.required,Validators.minLength(3)]],
      lastName:['',[Validators.required,Validators.minLength(4)]],
      email:['',[Validators.required,Validators.email]],
      pwd:['',[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{5,10}$/)]]  ,
      confirmPwd :[''],
      img:['']

    
    },
    {
      validators:MustMatch("pwd","confirmPwd"),//naayt lel validators li sna3neh ahna 
    }
    )
  
  }
  signup(){
    console.log('here is signup chicked', this.signupForm.value);
    this.signupForm.value.role=(this.path=="/signup")? "user" : "admin";
    this.userService.signup(this.signupForm.value , this.signupForm.value.img).subscribe((response)=>{
      console.log("here response after signup ",response);
      if(response.msg){
        this.router.navigate(["login"]) ;
        
      }else{
        this.errorMsg  ="email exist";
      }
    });
  }
  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log("here selected file",file);
    //inser file fi attribut img
     this.signupForm.patchValue({ img: file });
    //updateValueAndValidity() taaml mise a jour (refresh)
    this.signupForm.updateValueAndValidity();
    // FileReader() une instance de reader  yaatini path de fichier selectionée 
     const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
   }
}
