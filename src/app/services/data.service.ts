import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { CharacterDetail } from '../model/character-detail';
import { LocationDetail } from '../model/location-detail';
import { EpisodeDetail } from '../model/episode-detail';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  allCharacters = new BehaviorSubject<CharacterDetail[]>([]);

  readonly BASE_URL = 'https://rickandmortyapi.com/api/';

  pageNumber = 1;

  constructor(private http: HttpClient) {
    this.getAllCharacters();
  }

  getAllCharacters(): void{
    this.http.get<any>(this.BASE_URL + 'character?page=' + this.pageNumber).pipe(
      map(data => data.results)
    ).subscribe(characters => this.allCharacters.next(characters));
  }

  previousPage(){
    if (this.pageNumber>1) {
      this.pageNumber--;
      this.getAllCharacters();
    }
  }

  nextPage(){
    this.pageNumber++;
    this.getAllCharacters();
  }

  getSingleCharacter(id: string): Observable<CharacterDetail> {
    return this.http.get<CharacterDetail>(this.BASE_URL + 'character/' + id)
  }

    // getAllCharacters(): Observable<CharacterDetail[]>{
  //   return this.http.get<any>(this.BASE_URL + 'character?page=' + this.pageNumber).pipe(
  //     map(data => data.results)
  //   );
  // }


  getLocation(id: string) {
    return this.http.get<LocationDetail>(this.BASE_URL + 'location/' + id)
  }

  getEpisode(id: string){
    return this.http.get<EpisodeDetail>(this.BASE_URL + 'episode/'+id)
  }

}
