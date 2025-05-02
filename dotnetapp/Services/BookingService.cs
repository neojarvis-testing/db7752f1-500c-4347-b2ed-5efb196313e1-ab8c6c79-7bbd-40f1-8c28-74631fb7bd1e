using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Models;
using dotnetapp.Data;
namespace dotnetapp.Services
{
    public class BookingService
    {
        public ApplicationDbContext _context;

        public BookingService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<BookingDto>> GetAllBookings()
        {
            return await _context.Bookings
                .Include(b => b.Room)
                .Include(b => b.User)
                .Select(b => new BookingDto
                {
                    BookingId = b.BookingId,
                    RoomId = b.Room.RoomId,
                    CheckInDate = b.CheckInDate,
                    CheckOutDate = b.CheckOutDate,
                    Status = b.Status,
                    SpecialRequests = b.SpecialRequests,
                    BookingPurpose = b.BookingPurpose,
                    AdditionalComments = b.AdditionalComments,
                    UserId = b.User.UserId,
                    Username = b.User.Username,
                    HotelName = b.Room.HotelName,
                    RoomType = b.Room.RoomType,
                    PricePerNight = b.Room.PricePerNight,
                    Location = b.Room.Location
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<BookingDto>> GetBookingsByUserId(int userId)
        {
            return await _context.Bookings
                .Where(b => b.UserId == userId)
                .Include(b => b.Room)
                .Select(b => new BookingDto
                {
                    BookingId = b.BookingId,
                    RoomId = b.Room.RoomId,
                    CheckInDate = b.CheckInDate,
                    CheckOutDate = b.CheckOutDate,
                    Status = b.Status,
                    SpecialRequests = b.SpecialRequests,
                    BookingPurpose = b.BookingPurpose,
                    AdditionalComments = b.AdditionalComments,
                    UserId = b.User.UserId,
                    Username = b.User.Username,
                    HotelName = b.Room.HotelName,
                    RoomType = b.Room.RoomType,
                    PricePerNight = b.Room.PricePerNight,
                    Location = b.Room.Location
                })
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
}