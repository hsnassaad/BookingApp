import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, ModalController, ActionSheetController } from '@ionic/angular';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';
import { Place } from 'src/app/Models/place';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss']
})
export class PlaceDetailPage implements OnInit {
  
  place: Place;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private navCtrl: NavController,
    private modalCtr: ModalController,
    private placesService: PlacesService,
    private actionSheetCtrl: ActionSheetController
  ) {}

  ngOnInit() {
    this.activeRoute.paramMap.subscribe(param => {
      if (!param.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }
      this.place = this.placesService.getPlace(param.get('placeId'));
    });
  }

  onBookPlace() {
    // this.navCtr.navigateBack('/places/tabs/discover');
    this.actionSheetCtrl.create({
      header: 'Choose an Action',
      buttons: [
        {
          text: 'Select Date',
          handler: () => {
            this.openBookingModal('select');
          }
        },
        {
          text: 'Random Date',
          handler: () => {
            this.openBookingModal('random');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]

    }).then(actionEl => {
      actionEl.present();
    });

  }

  openBookingModal(mode: 'select' | 'random') {
    this.modalCtr.create({
      component: CreateBookingComponent,
      componentProps: {selectedPlace: this.place}
    }).then(modelElement => {
      modelElement.present();
      return modelElement.onDidDismiss();
    })
    .then(resultData => {
      if (resultData.role === 'confirm') {
      console.log('Booked');
      }
      console.log(resultData.data, resultData.role);
    });
  }
}
