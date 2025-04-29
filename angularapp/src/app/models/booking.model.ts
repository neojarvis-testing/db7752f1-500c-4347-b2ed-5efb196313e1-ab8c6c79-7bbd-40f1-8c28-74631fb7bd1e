export interface Booking {
    bookingId?: number;
    userId: number;
    roomId: number;
    checkInDate: string;
    checkOutDate: string;
    status: string;
    specialRequests: string;
    bookingPurpose: string;
    additionalComments?: string;
}
