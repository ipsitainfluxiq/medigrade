
/**
 * Created by kta pc on 7/19/2017.
 */

import { Pipe, PipeTransform } from '@angular/core';
//import {type} from "os";

@Pipe({
    name: 'orderBy'
})
export class OrderBy {
    transform(array: Array<string>, args: string,type:number): Array<string> {

        /*console.log('aa');
         console.log(array);
         console.log(args);
         console.log(type);*/

        //array.sort(dynamicSort(args));
        if (typeof (array)!='undefined') {
            array.sort(function (a: any, b: any) {
                //console.log(args);
                //console.log(type);
                //console.log(a[args]);
                // var nameA = a[args].toString().toLowerCase(), nameB = b[args].toString().toLowerCase()
                var nameA = a[args], nameB = b[args];
                if (nameA < nameB) //sort string ascending
                    if(!type || type == 1)return -1
                    else return 1
                if (nameA > nameB)
                    if(!type || type == 1) return 1
                    else return -1 //default return value (no sorting)

            });
            return array;
        }
        return array;
    }



}

function dynamicSort(property:any) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a:any,b:any) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}