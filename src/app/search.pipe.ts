

import { Pipe, PipeTransform } from '@angular/core';
import {Commonservices} from './app.commonservices' ;

@Pipe({
    name: 'usersearch'
})
export class UsersearchPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        // console.log('arg' + args);
       //  console.log('value');
       //  console.log(value);
        var val1: any = [];
        var flag: any = 0;

        // return null;
        if (typeof(args)!= 'undefined') {
            args = args.toLocaleLowerCase();

            if (args === '') {
                return value;
            } else {
                val1 = [];
                let  c = 0;

                args = args.split('|');
             //   console.log('arg' + args);
              //  console.log(args);
                for (let x in args) {

                    let c =0;
                    // val1[c]=[];
                    if (args[x] != '') {
                      //  console.log('arg val ===' + args[x]);
                      //  console.log(args[x]);
                        value = this.callf(value , args[x]);

                    }
                    c++;
                }
                console.log(value);
                console.log('value');
                return value;
                /*return value.filter(value=> (value.firstname.toLocaleLowerCase().indexOf(args) != -1 || value.lastname.toLocaleLowerCase().indexOf(args) != -1 || value.email.toLocaleLowerCase().indexOf(args) != -1)  );*/
            }
        }


        // return value;
    }
    callf(vals , args) {
        let value = vals;

        var val1: any = [];
        var flag: any = 0;
        for (let key in vals) {

            flag = 0;
            //  console.log('args');
            //  console.log(args);
            //  console.log('value');
            //  console.log(value[key]);
            for (let key1 in value[key]) {
               //   console.log(value[key][key1]);
                if ((typeof value[key][key1] === 'string' || value[key][key1] instanceof String) &&
                    (value[key][key1].toString().toLowerCase().indexOf(args.toString().toLowerCase()) != -1)) {
                    //    console.log('ttt');
                    // console.log(value.filter(value=> (value.firstname.toLocaleLowerCase().indexOf(args[x]) != -1 || value.lastname.toLocaleLowerCase().indexOf(args[x]) != -1 || value.email.toLocaleLowerCase().indexOf(args[x]) != -1)  ));
                    if (flag != 1) {
                        val1.push(value[key]);
                    }

                    flag = 1;
                }
                // console.log(66);
                //  console.log(value);
                //  console.log(value.filter(value=> (value[key1].toLocaleLowerCase().indexOf(args) != -1)  ));

                // return value.filter(value=> (value[key1].toLocaleLowerCase().indexOf(args) != -1)  );
            }
        }
        console.log('val1');
        console.log(val1);
        console.log(val1.length);
        val1[0].lval=val1.length;
        return val1;
    }
}


