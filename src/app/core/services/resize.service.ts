import { ElementRef, Injectable } from "@angular/core";
import { fromEvent, Observable} from "rxjs";
import { map } from 'rxjs/operators';

export type ResizeInfo = {
  width: number;
  height: number;
}

@Injectable({
  providedIn: 'root',
})
export class ResizeService {
  resizes: Map<HTMLElement, Observable<ResizeInfo>> = new Map();

  constructor() { }

  getResize(el: ElementRef): Observable<ResizeInfo> {
    return this.resizes[el.nativeElement] = this.resizes[el.nativeElement] ??
      fromEvent(window, 'resize')
      .pipe(
        map(this.getResizeInfo.bind(this, el))
      );
  }

  private getResizeInfo(el: ElementRef):ResizeInfo {
    return {
      width: el.nativeElement.offsetWidth,
      height: el.nativeElement.offsetHeight,
    };
  }
}