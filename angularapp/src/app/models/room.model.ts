export interface Room
{
    RoomId?:number;
    HotelName:string;
    RoomType:string;
    NoOfRooms:number;
    PricePerNight:number;
    Location:string;
    BedType:string;
    IsAvailable:Boolean;
    Description:string;
    Facilities:string;
    ImageUrl:string;
}