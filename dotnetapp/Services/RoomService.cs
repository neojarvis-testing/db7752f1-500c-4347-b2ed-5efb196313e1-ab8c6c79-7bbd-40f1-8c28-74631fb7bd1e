using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Data;
using dotnetapp.Models;
using dotnetapp.Exceptions;
using dotnetapp.Controllers;
using Microsoft.EntityFrameworkCore;

namespace dotnetapp.Services
{
    public class RoomService
    {
        public ApplicationDbContext _context;
        public RoomService(ApplicationDbContext context)
        {
            _context=context;
        }

        public async Task<IEnumerable<Room>> GetAllRooms()
        {
            return await _context.Rooms.ToListAsync();
        }

        public async Task<Room> GetRoomById(int roomId)
        {
            return await _context.Rooms.FindAsync(roomId);
        }

        public async Task<bool> AddRoom(Room room)
        {
            System.Console.WriteLine("--------------");
            System.Console.WriteLine(room);
            int roomCount = await _context.Rooms.Where(r => r.HotelName.ToLower() == room.HotelName.ToLower()).SumAsync(r => r.NoOfRooms);
                // System.Console.WriteLine("-----------------------");
                // System.Console.WriteLine(roomCount);
            if ((roomCount + room.NoOfRooms) > 10)
            {
                
              throw new RoomException("Total number of rooms for this hotel cannot exceed 10.");
                // return false;
            }
    
            _context.Rooms.Add(room);
            await _context.SaveChangesAsync();
            return true;
        }
 
         public async Task<bool> UpdateRoom(int roomId, Room updatedRoom)
        {
            var existingRoom = await _context.Rooms.FindAsync(roomId);
            if (existingRoom == null)
            {
                Console.WriteLine("=======================");
                return false;
            }
    
            int roomCount = await _context.Rooms.Where(r => r.HotelName.ToLower() == updatedRoom.HotelName.ToLower()).SumAsync(r => r.NoOfRooms);
            //System.Console.WriteLine("----------------------------------------------------------------------------------------------------");
            //System.Console.WriteLine(roomCount);
            //System.Console.WriteLine(roomCount + updatedRoom.NoOfRooms - existingRoom.NoOfRooms);
            if ((roomCount + updatedRoom.NoOfRooms - existingRoom.NoOfRooms) > 10)
            {
              throw new RoomException("Total number of rooms for this hotel cannot exceed 10.");
            }
    
            _context.Entry(existingRoom).CurrentValues.SetValues(updatedRoom);
            await _context.SaveChangesAsync();
            return true;
        }
 
        public async Task<bool> DeleteRoom(int roomId)
        {
            var room = await _context.Rooms.FindAsync(roomId);
            if (room == null)
            {
                return false;
            }
    
            bool isReferenced = await _context.Bookings.AnyAsync(b => b.RoomId == roomId && b.Status.ToLower() != "rejected");
            if (isReferenced)
            {
                throw new RoomException("This room cannot be deleted because it is currently associated with existing bookings.");
            }
    
            _context.Rooms.Remove(room);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<DashboardSummaryDto> GetDashboardSummaryAsync()
        {
            return new DashboardSummaryDto
            {
                TotalUsers = await _context.Users.CountAsync(),
                TotalRooms = await _context.Rooms.CountAsync(),
                TotalBookings = await _context.Bookings.CountAsync(),
                TotalPending = await _context.Bookings.CountAsync(b => b.Status == "Pending"),
                TotalConfirmed = await _context.Bookings.CountAsync(b => b.Status == "Confirmed"),
                TotalRejected = await _context.Bookings.CountAsync(b => b.Status == "Cancelled" || b.Status == "Rejected"),
                TotalFeedbacks = await _context.Feedbacks.CountAsync()
            };
        }

    }

}