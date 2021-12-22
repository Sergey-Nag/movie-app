import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  get isAutharized():boolean {
    return false;
  }
}