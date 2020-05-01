export interface Booking {

    id: string;
    placeId: string;
    userId: string;
    placeTitle: string;
    placeImage: string;
    firstName: string;
    lastName: string;
    bookedFrom: Date;
    bookedTo: Date;
    guestNumber: number;
}
