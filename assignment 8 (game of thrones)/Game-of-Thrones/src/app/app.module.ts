import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';

import { BooksComponent } from './books/books.component';
import { CharactersComponent } from './characters/characters.component';
import { HousesComponent } from './houses/houses.component';
import { SeriesHttpService } from './series-http.service';
import { HttpClientModule } from '@angular/common/http';
import { CharacterViewComponent } from './character-view/character-view.component';
import { HouseViewComponent } from './house-view/house-view.component';
import { BookViewComponent } from './book-view/book-view.component';
@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    CharactersComponent,
    HousesComponent,
    CharacterViewComponent,
    HouseViewComponent,
    BookViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'books', component:BooksComponent },
      {path:'characters',component:CharactersComponent },
      {path:'houses', component:HousesComponent },
      {path:'', redirectTo:'books',pathMatch:'full' },
      {path:'books/:id',component:BookViewComponent },
      {path:'characters/:id',component:CharacterViewComponent },
      {path:'houses/:id',component:HouseViewComponent}
    ])
  ],
  providers: [SeriesHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
