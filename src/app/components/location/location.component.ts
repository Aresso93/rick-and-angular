import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationDetail } from 'src/app/model/location-detail';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent {

  location? : LocationDetail

  constructor(private route:ActivatedRoute, private dataServ: DataService, private router:Router){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.dataServ.getLocation(id).subscribe((loc => this.location = loc))
    }
  }

  navigateToCharacter(){
    const residentsArray = this.location?.residents;
    if (residentsArray) {
      for (let i = 0; i < residentsArray.length; i++) {
        const character = residentsArray[i];
        let characterIdArray = character.split('/')
        const characterId = characterIdArray[characterIdArray.length-1]
        console.log(characterId);
        this.router.navigateByUrl("/character/"+characterId)
      }
    }
    
    
    // const urlArray = url.split('/');
    // const characterId = urlArray[urlArray.length-1]
    // console.log(characterId);
    // this.router.navigateByUrl("/character/"+characterId)
  }

}
