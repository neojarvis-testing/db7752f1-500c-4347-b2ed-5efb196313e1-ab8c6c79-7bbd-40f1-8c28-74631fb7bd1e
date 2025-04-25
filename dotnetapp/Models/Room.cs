using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
    public class Room
    {
        [Key]
        public int RoomId { get; set; }
        public string HotelName { get; set; }
        public string RoomType { get; set; }
        public int NoOfRooms { get; set; }
        public decimal PricePerNight { get; set; }
        public string Location { get; set; }
        public string BedType { get; set; }
        public bool IsAvailable { get; set; }
        public string Description { get; set; }
        public string Facilities { get; set; }
        public string ImageUrl { get; set; }
    }
}