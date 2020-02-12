import { Injectable } from '@angular/core';
import { Booking } from '../Models/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private _bookings: Booking[] = [
    {
      id: 'xyz',
      placeId: 'p1',
      placeTitle: 'Manhattan Mansion',
      guestNumber: 2,
      userId: 'abc'
    }
  ];

  get booking() {
    return [...this._bookings];
  }

constructor() { }

}
