import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent implements OnInit {
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // const col = collection(this.db, 'backdrops');
    // collectionData(col).subscribe((data) => {
    //   console.log(data);
      
    // })
    
  }

}
