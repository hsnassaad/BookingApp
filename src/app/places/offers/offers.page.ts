import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from 'src/app/Models/place';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {

  places: Place[];

  constructor(private placesService: PlacesService, private router: Router) { }

  ngOnInit() {
   this.places =  this.placesService.places;
  }

  onEdit(id: string, slidingItem: IonItemSliding) {
    console.log('Editing item', id);
    slidingItem.close();
    this.router.navigate(['/', 'places', 'tabs', 'offers', 'edit', id]);
  }
}
