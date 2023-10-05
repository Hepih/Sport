import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'asterix'
})
export class AsterixPipe implements PipeTransform {
 
  transform(ch:string) {
   let t:any =["a","e","i","o","u","y","A","E","I","O","U","Y"];
   let result :string='';
   
   for (let  i = 0; i < ch.length; i++) {
    let x =ch[i];
     for (let j = 0; j < t.length; j++) {
       if ( ch[i] == t[j]) {
         x="*";
         break; 
       }
      }
      result+=x;
   }
   return result;
  }

}
