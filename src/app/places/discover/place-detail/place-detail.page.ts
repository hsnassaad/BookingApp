import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  NavController,
  ModalController,
  ActionSheetController,
  LoadingController,
  AlertController
} from '@ionic/angular';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';
import { Place } from 'src/app/Models/place';
import { PlacesService } from '../../places.service';
import { Subscription } from 'rxjs';
import { BookingService } from 'src/app/bookings/booking.service';
import { Booking } from 'src/app/Models/booking';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss']
})
export class PlaceDetailPage implements OnInit, OnDestroy {
  place: Place;
  isBookable = false;
  bookingToAdd: any = {};
  private placesSub: Subscription;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private navCtrl: NavController,
    private modalCtr: ModalController,
    private placesService: PlacesService,
    private bookingService: BookingService,
    private authService: AuthService,
    private actionSheetCtrl: ActionSheetController,
    private loadingCtrl: LoadingController,
    private alertCtr: AlertController
  ) {}

  ngOnInit() {
    this.activeRoute.paramMap.subscribe(param => {
      if (!param.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }
      this.placesSub = this.placesService
        .getPlace(param.get('placeId'))
        .subscribe(
          data => {
            this.place = data;
            this.isBookable = this.place.userId !== this.authService.userId;
          },
          error => {
            this.alertCtr
              .create({
                header: 'An error occurred!',
                message: 'Could not load place.',
                buttons: [
                  {
                    text: 'Okay',
                    handler: () => {
                      this.router.navigateByUrl('/places/tabs/discover');
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

  onBookPlace() {
    // this.navCtr.navigateBack('/places/tabs/discover');
    this.actionSheetCtrl
      .create({
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
      })
      .then(actionEl => {
        actionEl.present();
      });
  }

  openBookingModal(mode: 'select' | 'random') {
    this.modalCtr
      .create({
        component: CreateBookingComponent,
        componentProps: { selectedPlace: this.place, selectedMode: mode }
      })
      .then(modelElement => {
        modelElement.present();
        return modelElement.onDidDismiss();
      })
      .then(resultData => {
        if (resultData.role === 'confirm') {
          const data = resultData.data.bookingData;

          this.bookingToAdd.placeTitle = this.place.title;
          this.bookingToAdd.placeId = this.place.id;
          this.bookingToAdd.placeImage = this.place.imageUrl;
          this.bookingToAdd.firstName = data.firstName;
          this.bookingToAdd.lastName = data.lastName;
          this.bookingToAdd.guestNumber = data.guestNumber;
          this.bookingToAdd.bookedFrom = data.startDate;
          this.bookingToAdd.bookedTo = data.endDate;

          this.loadingCtrl
            .create({
              message: 'Booking place...'
            })
            .then(bookingEl => {
              bookingEl.present();
              this.bookingService.addBooking(this.bookingToAdd).subscribe(
                () => {
                  bookingEl.dismiss();
                },
                error => {
                  bookingEl.dismiss();
                  console.error(error);
                }
              );
            });
        }
      });
  }

  ngOnDestroy(): void {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
}
