import { Injectable } from '@angular/core';
import { Booking } from '../Models/booking';
import { BehaviorSubject, pipe } from 'rxjs';
import { take, tap, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  // tslint:disable-next-line: variable-name
  private _bookings = new BehaviorSubject<Booking[]>([]);

  get booking() {
    return this._bookings.asObservable();
  }
  constructor(private authService: AuthService, private http: HttpClient) {}

  addBooking(booking: Booking) {
    let generatedId: string;
    booking.userId = this.authService.userId;
    return this.http
      .post<{ name: string }>(
        'https://ionic-angular-first-app.firebaseio.com/bookings.json',
        booking
      )
      .pipe(
        switchMap(resData => {
          generatedId = resData.name;
          return this.booking;
        }),
        take(1),
        tap(bookings => {
          booking.id = generatedId;
          this._bookings.next(bookings.concat(booking));
        })
      );
  }

  getAllBookings() {
    return this.http
      .get<{ [key: string]: Booking }>(
        `https://ionic-angular-first-app.firebaseio.com/bookings.json?orderBy="userId"&equalTo="${this.authService.userId}"`
      )
      .pipe(
        map(respose => {
          const bookings = [];
          let booking: Booking;
          for (const key in respose) {
            if (respose.hasOwnProperty(key)) {
              booking = respose[key];
              booking.bookedTo = new Date(respose[key].bookedTo);
              booking.bookedFrom = new Date(respose[key].bookedFrom);
              booking.id = key;
              bookings.push(booking);
            }
          }
          return bookings;
        }),
        tap(bookings => {
          this._bookings.next(bookings);
        })
      );
  }

  cancelBooking(bookingId: string) {
    return this.http
      .delete(
        `https://ionic-angular-first-app.firebaseio.com/bookings/${bookingId}.json`
      )
      .pipe(
        switchMap(respData => {
          return this._bookings;
        }),
        take(1),
        tap(bookings => {
          this._bookings.next(bookings.filter(b => b.id !== bookingId));
        })
      );
  }
}
