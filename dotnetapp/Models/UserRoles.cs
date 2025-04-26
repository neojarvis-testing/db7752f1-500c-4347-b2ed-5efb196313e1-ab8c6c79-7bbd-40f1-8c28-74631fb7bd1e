using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
    public class UserRoles
    {
        public string Admin { get; set; } = "Admin";
        public string Users { get; set; }   = "User";
    }
}