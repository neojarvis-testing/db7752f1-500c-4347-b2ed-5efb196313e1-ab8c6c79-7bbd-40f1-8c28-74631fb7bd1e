using System;
using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
    public class UserDTO
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string MobileNumber { get; set; }
    }
}
