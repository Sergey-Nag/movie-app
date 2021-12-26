import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TMDBService } from "../services/tmdb.service";
import { URL_DOMAIN } from "../constants/regExp.constants";
import { switchMap } from "rxjs/operators";
import { isConfigRequest, isDomainTMDB } from "src/app/helpers/interceptors";

@Injectable()
export class TMDBConfigInterceptor implements HttpInterceptor {
  constructor(private tmdb: TMDBService, private http: HttpClient) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isDomain = isDomainTMDB(req.url);

    if (!isDomain || this.tmdb.config || isConfigRequest(req.url)) {
      return next.handle(req);
    }

    return this.tmdb.getConfig()
      .pipe(switchMap(() => next.handle(req)));
  }

  
}