import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { TMDBConfigInterceptor } from "./interceptors/tmdb-config.interceptor";

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TMDBConfigInterceptor,
      multi: true,
    }
  ]
})
export class CoreModule { }