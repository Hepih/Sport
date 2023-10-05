import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myFilter'
})
export class MyFilterPipe implements PipeTransform {

  transform(T:any , ch:string){
    if(ch === undefined){
      return T;
    } // ken condition hedhi vrai yaani ch vide mefeha chy yrajaa T w yokhrej mel fonction  w meytaadech lel lignes li baadha 
  
    //filter trajaa tableau yaani akther men element *** mefihech break *** //test al tableau kol 
    return T.filter((obj:any)=>{
      return(
       obj.teamOne.toLowerCase().includes(ch.toLowerCase())|| obj.teamTwo.toLowerCase().includes(ch.toLowerCase())
      );

    });
  }

}
