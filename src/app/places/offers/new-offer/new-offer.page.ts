import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PlacesService } from '../../places.service';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss']
})
export class NewOfferPage implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private placeService: PlacesService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  onCreateOffer() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl
      .create({
        message: 'Creating offer...'
      })
      .then(loadingEl => {
        loadingEl.present();
        this.placeService.addPlace(this.form.value).subscribe(() => {
          loadingEl.dismiss();
          this.form.reset();
          this.navCtrl.navigateBack('/places/tabs/offers');
        }, error => {
          console.log(error);
          loadingEl.dismiss();
        });
      });
  }

  buildForm() {
    this.form = this.fb.group({
      title: [null, Validators.required],
      description: [null, [Validators.required, Validators.maxLength(100)]],
      price: [null, [Validators.required, Validators.min(1)]],
      availableFrom: [null, [Validators.required]],
      availableTo: [null, [Validators.required]]
    });
  }
}
