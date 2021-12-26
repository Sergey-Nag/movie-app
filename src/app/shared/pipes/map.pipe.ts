import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'map'})
export class MapPipe implements PipeTransform {
  transform(values: any[], key: string) {
    return values.map((val: any) => val[key]);
  }
}