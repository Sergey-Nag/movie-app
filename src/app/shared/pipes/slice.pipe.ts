import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'sliceArray'})
export class SliceArrayPipe implements PipeTransform {
  transform(array: any[], start: number, end?: number) {
    return array.slice(start, end);
  }
}