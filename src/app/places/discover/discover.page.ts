import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from 'src/app/Models/place';
import {SegmentChangeEventDetail} from '@ionic/core';
@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {

  placess: Place[];
  listedLoaded: Place[];
  items: any[] = [];

  constructor(private placesService: PlacesService) {
   }


  ngOnInit() {
  this.placess = this.placesService.places;
  this.listedLoaded = this.placess.slice(1);
}

onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
  console.log(event.detail);
}

}
