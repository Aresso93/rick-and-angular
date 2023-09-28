import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EpisodeDetail } from 'src/app/model/episode-detail';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.scss']
})
export class EpisodeComponent implements OnInit{

  episode?:EpisodeDetail

  constructor (private dataServ: DataService, private route:ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.dataServ.getEpisode(id).subscribe(ep => this.episode = ep)
    }
   
  }

  navigateToCharacter(){
    const url = this.episode!.characters;
    console.log(url);
    
    const urlArray = url;
    const characterId = urlArray[urlArray.length-1]
    console.log(characterId);
    this.router.navigateByUrl("/character/"+characterId)

  }

}
