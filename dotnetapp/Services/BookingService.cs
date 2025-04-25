using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Models;
using dotnetapp.Data;
public class BookingService
{
    public ApplicationDbContext _context;

    public BookingService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Booking>> GetAllBookings()
    {
        return await _context.Bookings
            .Include(b => b.Room)
            .Include(b => b.User)
            .ToListAsync();
    }

    public async Task<IEnumerable<Booking>> GetBookingsByUserId(int userId)
    {
        return await _context.Bookings
            .Where(b => b.UserId == userId)
            .Include(b => b.Room)
            .ToListAsync();
    }

    public async Task<bool> AddBooking(Booking booking)
    {
        await _context.Bookings.AddAsync(booking);
        await _context.SaveChangesAsync();
        return true;
    }
    public async Task<bool> UpdateBooking(int bookingId,Booking booking)
    {
        var existingBooking = await _context.Bookings.FindAsync(bookingId);
        if (existingBooking == null)
        {
            return false;
        }
        existingBooking.UserId = booking.UserId;
        existingBooking.RoomId = booking.RoomId;
        existingBooking.CheckInDate = booking.CheckInDate;
        existingBooking.CheckOutDate = booking.CheckOutDate;
        existingBooking.Status = booking.Status;
        existingBooking.SpecialRequests = booking.SpecialRequests;
        existingBooking.BookingPurpose = booking.BookingPurpose;
        existingBooking.AdditionalComments = booking.AdditionalComments;

        _context.Bookings.Update(existingBooking);
         await _context.SaveChangesAsync();
         return true;
    }
    public async Task<bool> DeleteBooking(int bookingId)
    {
        var booking = await _context.Bookings.FindAsync(bookingId);
         if (booking == null)
        {
           return false;
        }
        _context.Bookings.Remove(booking);
        await  _context.SaveChangesAsync();
        return true;

    }
    

    
}
