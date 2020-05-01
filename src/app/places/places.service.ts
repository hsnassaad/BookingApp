import { Injectable } from '@angular/core';
import { Place } from '../Models/place';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject, of } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  // tslint:disable-next-line: variable-name
  private _places = new BehaviorSubject<Place[]>([]);

  constructor(private authService: AuthService, private http: HttpClient) {}

  get places() {
    return this._places.asObservable();
  }

  getAllPlaces() {
    return this.http
      .get<{ [key: string]: Place }>(
        'https://ionic-angular-first-app.firebaseio.com/offerd-places.json'
      )
      .pipe(
        map(response => {
          const places = [];
          let place: Place;
          for (const key in response) {
            if (response.hasOwnProperty(key)) {
              place = response[key];
              place.availableFrom = new Date(response[key].availableFrom);
              place.availableTo = new Date(response[key].availableTo);
              place.id = key;
              places.push(place);
            }
          }
          return places;
        }),
        tap(places => {
          this._places.next(places);
        })
      );
  }

  getPlace(id: string) {
    return this.http
      .get<Place>(
        `https://ionic-angular-first-app.firebaseio.com/offerd-places/${id}.json`
      )
      .pipe(
        map(response => {
          response.availableFrom = new Date(response.availableFrom);
          response.availableTo = new Date(response.availableTo);
          return response;
        })
      );
  }

  addPlace(place: Place) {
    let generatedId: string;

    place.userId = this.authService.userId;
    place.availableFrom = new Date(place.availableFrom);
    place.availableTo = new Date(place.availableTo);
    place.imageUrl =
      'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042533/Carnegie-Mansion-nyc.jpg';

    return this.http
      .post<{ name: string }>(
        'https://ionic-angular-first-app.firebaseio.com/offerd-places.json',
        place
      )
      .pipe(
        switchMap(response => {
          generatedId = response.name;
          return this._places;
        }),
        take(1),
        tap(places => {
          place.id = generatedId;
          this._places.next(places.concat(place));
        })
      );
  }

  updatePlace(placeModel: any, id: string) {
    let updatedPlaces: Place[];
    return this.places.pipe(
      take(1),
      switchMap(places => {
        if (!places || places.length <= 0) {
          return this.getAllPlaces();
        } else {
          return of(places);
        }
      }),
      switchMap(places => {
        updatedPlaces = [...places];
        const index = updatedPlaces.findIndex(pl => pl.id === id);
        const placeToChange = updatedPlaces[index];
        placeToChange.title = placeModel.title;
        placeToChange.description = placeModel.description;
        return this.http.put(
          `https://ionic-angular-first-app.firebaseio.com/offerd-places/${id}.json`,
          placeToChange
        );
      }),
      tap(() => {
        this._places.next(updatedPlaces);
      })
    );
  }
}
