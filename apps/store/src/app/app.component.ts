import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { formatRating } from "@bg-hoard/store/util-formatters";
import { Observable, of } from 'rxjs';

@Component({
  selector: 'bg-hoard-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Board Game Hoard';
  games$: Observable<any[]>;
  formatRating = formatRating;

  constructor(
    private http: HttpClient
  ) { 
    this.games$ = of([]);
  }

  ngOnInit() {
    this.games$ = this.http.get<any[]>('/api/games');
  }

}
