import { Injectable } from '@angular/core';
import { Place } from '../Models/place';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  // tslint:disable-next-line: variable-name
  private _places: Place[] = [
    {
      id: 'p1',
      title: 'Manhattan Mansion',
      description: 'In heart of New York City',
      imageUrl:
        'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042533/Carnegie-Mansion-nyc.jpg',
      price: 149.99
    },
    {
      id: 'p2',
      title: 'Aramta',
      description: 'Hassan Assaad village',
      imageUrl:
        'https://www.lebanoninapicture.com/Prv/Images/Pages/Page_161671/%D8%B9%D8%B1%D9%85%D8%AA%D9%89-19-01-2018-snow-lebanon-southlebanon-aara-1-22-2018-11-26-56-am-l.jpg',
      price: 50
    },
    {
      id: 'p3',
      title: 'Aramta 3',
      description: 'Hassan Assaad village',
      imageUrl:
        'https://www.lebanoninapicture.com/Prv/Images/Pages/Page_161671/%D8%B9%D8%B1%D9%85%D8%AA%D9%89-19-01-2018-snow-lebanon-southlebanon-aara-1-22-2018-11-26-56-am-l.jpg',
      price: 50
    },
    {
      id: 'p4',
      title: 'Aramta 4',
      description: 'Hassan Assaad village',
      imageUrl:
        'https://www.lebanoninapicture.com/Prv/Images/Pages/Page_161671/%D8%B9%D8%B1%D9%85%D8%AA%D9%89-19-01-2018-snow-lebanon-southlebanon-aara-1-22-2018-11-26-56-am-l.jpg',
      price: 50
    },
    {
      id: 'p5',
      title: 'Aramta 5',
      description: 'Hassan Assaad village',
      imageUrl:
        'https://www.lebanoninapicture.com/Prv/Images/Pages/Page_161671/%D8%B9%D8%B1%D9%85%D8%AA%D9%89-19-01-2018-snow-lebanon-southlebanon-aara-1-22-2018-11-26-56-am-l.jpg',
      price: 50
    },
    {
      id: 'p6',
      title: 'Aramta 6',
      description: 'Hassan Assaad village',
      imageUrl:
        'https://www.lebanoninapicture.com/Prv/Images/Pages/Page_161671/%D8%B9%D8%B1%D9%85%D8%AA%D9%89-19-01-2018-snow-lebanon-southlebanon-aara-1-22-2018-11-26-56-am-l.jpg',
      price: 50
    },
    {
      id: 'p6',
      title: 'Aramta 6',
      description: 'Hassan Assaad village',
      imageUrl:
        'https://www.lebanoninapicture.com/Prv/Images/Pages/Page_161671/%D8%B9%D8%B1%D9%85%D8%AA%D9%89-19-01-2018-snow-lebanon-southlebanon-aara-1-22-2018-11-26-56-am-l.jpg',
      price: 50
    },
    {
      id: 'p6',
      title: 'Aramta 6',
      description: 'Hassan Assaad village',
      imageUrl:
        'https://www.lebanoninapicture.com/Prv/Images/Pages/Page_161671/%D8%B9%D8%B1%D9%85%D8%AA%D9%89-19-01-2018-snow-lebanon-southlebanon-aara-1-22-2018-11-26-56-am-l.jpg',
      price: 50
    },
    {
      id: 'p6',
      title: 'Aramta 6',
      description: 'Hassan Assaad village',
      imageUrl:
        'https://www.lebanoninapicture.com/Prv/Images/Pages/Page_161671/%D8%B9%D8%B1%D9%85%D8%AA%D9%89-19-01-2018-snow-lebanon-southlebanon-aara-1-22-2018-11-26-56-am-l.jpg',
      price: 50
    },
    {
      id: 'p6',
      title: 'Aramta 6',
      description: 'Hassan Assaad village',
      imageUrl:
        'https://www.lebanoninapicture.com/Prv/Images/Pages/Page_161671/%D8%B9%D8%B1%D9%85%D8%AA%D9%89-19-01-2018-snow-lebanon-southlebanon-aara-1-22-2018-11-26-56-am-l.jpg',
      price: 50
    },
    {
      id: 'p6',
      title: 'Aramta 6',
      description: 'Hassan Assaad village',
      imageUrl:
        'https://www.lebanoninapicture.com/Prv/Images/Pages/Page_161671/%D8%B9%D8%B1%D9%85%D8%AA%D9%89-19-01-2018-snow-lebanon-southlebanon-aara-1-22-2018-11-26-56-am-l.jpg',
      price: 50
    },
    {
      id: 'p6',
      title: 'Aramta 6',
      description: 'Hassan Assaad village',
      imageUrl:
        'https://www.lebanoninapicture.com/Prv/Images/Pages/Page_161671/%D8%B9%D8%B1%D9%85%D8%AA%D9%89-19-01-2018-snow-lebanon-southlebanon-aara-1-22-2018-11-26-56-am-l.jpg',
      price: 50
    },
    {
      id: 'p6',
      title: 'Aramta 6',
      description: 'Hassan Assaad village',
      imageUrl:
        'https://www.lebanoninapicture.com/Prv/Images/Pages/Page_161671/%D8%B9%D8%B1%D9%85%D8%AA%D9%89-19-01-2018-snow-lebanon-southlebanon-aara-1-22-2018-11-26-56-am-l.jpg',
      price: 50
    },
    {
      id: 'p6',
      title: 'Aramta 6',
      description: 'Hassan Assaad village',
      imageUrl:
        'https://www.lebanoninapicture.com/Prv/Images/Pages/Page_161671/%D8%B9%D8%B1%D9%85%D8%AA%D9%89-19-01-2018-snow-lebanon-southlebanon-aara-1-22-2018-11-26-56-am-l.jpg',
      price: 50
    },
    {
      id: 'p6',
      title: 'Aramta 6',
      description: 'Hassan Assaad village',
      imageUrl:
        'https://www.lebanoninapicture.com/Prv/Images/Pages/Page_161671/%D8%B9%D8%B1%D9%85%D8%AA%D9%89-19-01-2018-snow-lebanon-southlebanon-aara-1-22-2018-11-26-56-am-l.jpg',
      price: 50
    },
    {
      id: 'p6',
      title: 'Aramta 6',
      description: 'Hassan Assaad village',
      imageUrl:
        'https://www.lebanoninapicture.com/Prv/Images/Pages/Page_161671/%D8%B9%D8%B1%D9%85%D8%AA%D9%89-19-01-2018-snow-lebanon-southlebanon-aara-1-22-2018-11-26-56-am-l.jpg',
      price: 50
    },
    {
      id: 'p7',
      title: 'The Foggy Palace',
      description: 'Not your average city trip!',
      imageUrl:
        'https://previews.123rf.com/images/andrascsontos/andrascsontos1609/andrascsontos160900120/63752595-foggy-old-stairway-of-a-palace.jpg',
      price: 20
    }
  ];

  constructor() {}

  get places() {
    return [...this._places];
  }

  getPlace(id: string) {
    return { ...this._places.find(x => x.id === id) };
  }
}
