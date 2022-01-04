import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { CategoryBackdrop } from './types/database.types';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private afdb: AngularFireDatabase) { }

  getCategoryBackdrop(category_id?: number): Observable<string | null> {
    return this.afdb.object<string | null>(`backdrops/categories/${category_id || ''}`).valueChanges();
  }

}
