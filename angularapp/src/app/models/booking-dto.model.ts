
export interface BookingDto {
    bookingId: number;
    roomId: number;
    checkInDate: string;
    checkOutDate: string;
    status: string;
    specialRequests: string;
    bookingPurpose: string;
    additionalComments?: string;
    userId: number;
    username: string;
    hotelName: string;
    roomType: string;
    pricePerNight: number;
    location: string;
  }
  