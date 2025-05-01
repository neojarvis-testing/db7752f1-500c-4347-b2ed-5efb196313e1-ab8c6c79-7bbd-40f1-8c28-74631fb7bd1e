using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace dotnetapp.Models
{
    public class BookingDto
    {
        public int BookingId { get; set; }
        public int RoomId { get; set; }
        public string CheckInDate { get; set; }
        public string CheckOutDate { get; set; }
        public string Status { get; set; }
        public string SpecialRequests { get; set; }
        public string BookingPurpose { get; set; }
        public string? AdditionalComments { get; set; }
        public int UserId { get; set; }
        public string Username { get; set; }
        public string HotelName { get; set; }
        public string RoomType { get; set; }
        public decimal PricePerNight { get; set; }
        public string Location { get; set; }
    }

}