using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
    public class ApplicationUser : IdentityUser
    {
        [Required(ErrorMessage = "Name is required")]
        [MaxLength(256)]
        public string Name { get; set; }
    
    }
}