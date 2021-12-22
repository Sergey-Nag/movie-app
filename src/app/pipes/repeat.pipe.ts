import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'repeat'})
export class RepeatPipe implements PipeTransform {
  transform(value: number) {
    return Array(value);
  }
}