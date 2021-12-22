import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorizeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
