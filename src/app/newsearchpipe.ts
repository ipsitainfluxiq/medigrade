
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'newsearch'
})
export class Newsearchpipe implements PipeTransform {

    transform(value: any, args?: any): any {
        let val1:any=[];
        let flag:any=0;
        args = args.toLocaleLowerCase();

        if(args === ''){
            return value;
        }else {
            val1=[];
            for (let key in value) {
                flag=0;
                for( let key1 in value[key]){
                    //  console.log(value[key][key1]);
                    if ((typeof value[key][key1] === 'string' || value[key][key1] instanceof String) &&
                        (value[key][key1].toString().toLowerCase().indexOf(args.toString().toLowerCase()) != -1)) {
                        if(flag!=1)val1.push(value[key]);
                        flag=1;
                    }
                }
            }
            return val1;
        }
    }

}