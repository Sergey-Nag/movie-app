import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'join'
})
export class JoinPipe implements PipeTransform {

  transform(values: any[], key: string = ''): unknown {
    return values.join(key);
  }

}
