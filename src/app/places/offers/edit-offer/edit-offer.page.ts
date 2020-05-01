import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  NavController,
  LoadingController,
  AlertController
} from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Place } from 'src/app/Models/place';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss']
})
export class EditOfferPage implements OnInit, OnDestroy {
  form: FormGroup;
  place: Place;
  placeId: string;
  isLoading = false;
  private placesSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private navCtrl: NavController,
    private placesService: PlacesService,
    private loadingCtrl: LoadingController,
    private alertCtr: AlertController
  ) {}

  ngOnInit() {
    this.activeRoute.paramMap.subscribe(param => {
      if (!param.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/offers');
        return;
      }
      this.placeId = param.get('placeId');
      this.isLoading = true;
      this.placesSub = this.placesService
        .getPlace(param.get('placeId'))
        .subscribe(
          data => {
            this.place = data;
            this.buildForm();
            this.isLoading = false;
          },
          error => {
            this.alertCtr
              .create({
                header: 'An error occurred!',
                message: 'Place could not be load. Please try again later',
                buttons: [
                  {
                    text: 'Okay',
                    handler: () => {
                      this.navCtrl.navigateBack('/places/tabs/offers');
                    }
                  }
                ]
              })
              .then(alertEl => {
                alertEl.present();
              });
          }
        );
    });
  }

  buildForm() {
    this.form = this.fb.group({
      title: [this.place.title, Validators.required],
      description: [
        this.place.description,
        [Validators.required, Validators.maxLength(100)]
      ]
    });
  }

  onUpdateOffer() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl
      .create({
        message: 'Updating place...'
      })
      .then(loadingEl => {
        loadingEl.present();
        this.placesService
          .updatePlace(this.form.value, this.place.id)
          .subscribe(
            () => {
              loadingEl.dismiss();
              this.form.reset();
              this.navCtrl.navigateBack('/places/tabs/offers');
            },
            error => {
              loadingEl.dismiss();
              console.error(error);
            }
          );
      });
  }

  ngOnDestroy(): void {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
}
