import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterDetail } from 'src/app/model/character-detail';
import { LocationDetail } from 'src/app/model/location-detail';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent {
  @Input() character?: CharacterDetail;

  location?: LocationDetail;
  residentCharacters: CharacterDetail[] = [];

  constructor(private route: ActivatedRoute, private dataServ: DataService, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.dataServ.getLocation(id).subscribe((loc) => {
        this.location = loc;
        this.fetchResidentCharacters(loc.residents);
      });
    }
  }

  fetchResidentCharacters(residents: string[]) {
    residents.forEach((residentUrl) => {
      const characterId = residentUrl.split('/').pop();
      if (characterId) {
        this.dataServ.getSingleCharacter(characterId).subscribe((character) => {
          this.residentCharacters.push(character);
        });
      }
    });
  }

  navigateToCharacter(characterId: number) {
    this.router.navigateByUrl('/character/' + characterId);
  }
}