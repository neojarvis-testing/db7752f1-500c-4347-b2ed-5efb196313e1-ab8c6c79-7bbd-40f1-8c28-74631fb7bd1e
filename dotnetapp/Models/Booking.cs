using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace dotnetapp.Models
{
    public class Booking
    {
        [Key]
        public int BookingId { get; set; }
        public int UserId { get; set; }
        public int RoomId { get; set; }
        public string CheckInDate { get; set; }
        public string CheckOutDate { get; set; }
        public string Status { get; set; }
        public string SpecialRequests { get; set; }
        public string BookingPurpose { get; set; }
        public string? AdditionalComments { get; set; }

        [JsonIgnore]
        public User? User { get; set; }
        [JsonIgnore]
        public Room? Room { get; set; }
    }
}