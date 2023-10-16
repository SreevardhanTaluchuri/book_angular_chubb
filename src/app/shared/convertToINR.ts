import { Pipe , PipeTransform } from "@angular/core";

@Pipe({
    name : 'convertToINR',
})
export class ConvertToINR implements PipeTransform{
    transform(value: string, character : string) : number {
        return (parseInt(value)*87.63) ;
    }
}