import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from 'src/app/Models/place';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss']
})
export class DiscoverPage implements OnInit, OnDestroy {
  placess: Place[];
  listedLoaded: Place[];
  relevantPlaces: Place[];
  isLoading = false;
  items: any[] = [];
  private placesSub: Subscription;

  constructor(private placesService: PlacesService, private authService: AuthService) {}

  ngOnInit() {
    this.placesSub = this.placesService.places.subscribe(data => {
      this.placess = data;
      this.relevantPlaces = this.placess;
      this.listedLoaded = this.relevantPlaces.slice(1);
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.placesService.getAllPlaces().subscribe((data) => {
      this.isLoading = false;
    });
  }
  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    if (event.detail.value === 'all') {
      this.relevantPlaces = this.placess;
    } else {
      this.relevantPlaces = this.placess.filter(u => u.userId !== this.authService.userId);
    }
    this.listedLoaded = this.relevantPlaces.slice(1);
  }

  ngOnDestroy(): void {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
}
