import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { IGame } from "@bg-hoard/util-interface";

import { formatRating } from "@bg-hoard/store/util-formatters";
import { Observable, of } from 'rxjs';

@Component({
  selector: 'bg-hoard-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Board Game Hoard';
  games$: Observable<IGame[]>;
  formatRating = formatRating;

  constructor(
    private http: HttpClient
  ) { 
    this.games$ = of([]);
  }

  ngOnInit() {
    this.games$ = this.http.get<IGame[]>('/api/games');

    //Randomize the title
    const MAX = 15;
    const arr = this.title.split(' ');
    for (let count = 0; count < MAX; count++) {
      const index = Math.floor(Math.random() * arr.length);
      const word = arr.splice(index, 1)[0];
      arr.push(word);      
    }
  }

}
