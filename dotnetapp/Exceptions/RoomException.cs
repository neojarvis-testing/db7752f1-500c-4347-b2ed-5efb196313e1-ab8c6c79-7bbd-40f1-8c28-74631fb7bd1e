using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Models;
using dotnetapp.Controllers;

namespace dotnetapp.Exceptions
{
    public class RoomException : Exception
    {
        public RoomException(string message) : base(message)
        {
            
        }
        
    }
}