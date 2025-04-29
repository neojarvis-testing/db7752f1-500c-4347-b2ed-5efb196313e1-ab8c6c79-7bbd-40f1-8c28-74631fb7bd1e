export interface Room {
    roomId?: number;
    hotelName: string;
    roomType: string;
    noOfRooms: number;
    pricePerNight: number;
    location: string;
    bedType: string;
    isAvailable: boolean;
    description: string;
    facilities: string;
    imageUrl: string;
}
