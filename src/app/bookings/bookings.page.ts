import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookingService } from './booking.service';
import { Booking } from '../Models/booking';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss']
})
export class BookingsPage implements OnInit, OnDestroy {
  private bookingSub: Subscription;
  bookings: Booking[];
  isLoading = false;

  constructor(private bookingService: BookingService, private loadingCtrl: LoadingController) {}

  ionViewWillEnter() {
    this.isLoading = true;
    this.bookingService.getAllBookings().subscribe(() => {
      this.isLoading = false;
    });
  }

  ngOnInit() {
    this.bookingSub = this.bookingService.booking.subscribe(bookings => {
      this.bookings = bookings;
    });
  }

  onCancelBooking(id: string, slidingBooking: IonItemSliding) {
    this.loadingCtrl.create({message: 'Canceling..'}).then(cancelEl => {
      cancelEl.present();
      this.bookingService.cancelBooking(id).subscribe(() => {
        cancelEl.dismiss();
      });
    });
    slidingBooking.close();
  }

  ngOnDestroy(): void {
    this.bookingSub.unsubscribe();
  }
}
