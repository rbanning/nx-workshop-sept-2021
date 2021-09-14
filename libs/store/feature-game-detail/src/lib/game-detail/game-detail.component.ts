import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { formatRating } from "@bg-hoard/store/util-formatters"
import { Observable } from 'rxjs';
@Component({
  selector: 'bg-hoard-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent {
  game$: Observable<any>;
  formatRating = formatRating;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {

    this.game$ = this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('id')),
      switchMap(id => this.http.get<any>(`/api/games/${id}`))
    );

  }

   

  

}
