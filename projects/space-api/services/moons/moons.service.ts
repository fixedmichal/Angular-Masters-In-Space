import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { Moon } from '../../types';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoonsService {
  private http = inject(HttpClient);

  // once fetched moons list can be reused for future requests
  private moons = this.http.get<Moon[]>(`/api/moons`).pipe(
    shareReplay(1)
  )

  getMoons(params: {query?: string, includePlanets?: boolean} = {}): Observable<Moon[]> {
    return this.moons.pipe(
      map(moons => {
        const {query, includePlanets} = params;

        if (!query) { return moons; }

        return moons.filter(m => {
          const matchesName = m.name.toLowerCase().includes(query.toLowerCase());
          const matchesPlanet = m.planet.toLowerCase().includes(query.toLowerCase());
          return matchesName || (includePlanets && matchesPlanet);
        })
      })
    );
  }

  getMoon(id: number | null): Observable<Moon | null> {
    return this.moons.pipe(
      map((moons) => moons.find(moon => moon.id === id)!),
    )
  }

  getMoonName(id: number | null): Observable<string> {
    return this.getMoon(id).pipe(
      map(moon => moon ? `${moon.name} (${moon.planet})` : '')
    );
  }
}
