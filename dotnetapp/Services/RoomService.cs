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
        int roomCount = await _context.Rooms.CountAsync(r => r.HotelName == room.HotelName);
        if (roomCount > 10)
        {
           throw new RoomException("Total number of rooms for this hotel cannot exceed 10.");
           return false;
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
            return false;
        }
 
        int roomCount = await _context.Rooms.CountAsync(r => r.HotelName == updatedRoom.HotelName);
        if (roomCount > 10)
        {
            throw new RoomException("Total number of rooms for this hotel cannot exceed 10.");
            return false;
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
 
        bool isReferenced = await _context.Bookings.AnyAsync(b => b.RoomId == roomId);
        if (isReferenced)
        {
            throw new RoomException("Room cannot be deleted as it is referenced in a booking.");
            return false;
        }
 
        _context.Rooms.Remove(room);
        await _context.SaveChangesAsync();
        return true;
    }

}

}