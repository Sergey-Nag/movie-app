import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthorizeComponent } from './authorize/authorize.component';
import { UserInfoComponent } from './header/user-info/user-info.component';
import { NavComponent } from './nav/nav.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RowWrappComponent } from './row-wrapp/row-wrapp.component';
import { CardPlaceholderComponent } from './row-wrapp/card-placeholder/card-placeholder.component';
import { CoreModule } from './core/core.module';
import { FirebaseModule } from './firebase/firebase.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AuthorizeComponent,
    UserInfoComponent,
    NavComponent,
    RowWrappComponent,
    CardPlaceholderComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    AppRoutingModule,
    SharedModule,
    FirebaseModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
