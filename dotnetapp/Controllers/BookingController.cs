using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Services;
using dotnetapp.Models;


namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/booking")]
    public class BookingController : ControllerBase
    {
        public BookingService _bookingService;


        public BookingController(BookingService bookingService)
        {
            _bookingService = bookingService;
        }
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Booking>>> GetAllBookings()
        {
            var bookings = await _bookingService.GetAllBookings();
            return Ok(bookings); 
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBookingsByUserId(int userId)
        {
            var bookings = await _bookingService.GetBookingsByUserId(userId);
            return Ok(bookings); 
        }

        [HttpPost]
        public async Task<ActionResult> AddBooking([FromBody] Booking booking)
        {
            try
            {
                var result = await _bookingService.AddBooking(booking);
                if (result)
                {
                    return Ok("Booking added successfully"); 
                }

                return BadRequest("Failed to add booking");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}"); 
            }
        }
        [HttpPut("{bookingId}")]
        public async Task<ActionResult> UpdateBooking(int bookingId, [FromBody] Booking booking)
        {
            try
            {
                var result = await _bookingService.UpdateBooking(bookingId, booking);
                if (result)
                {
                    return Ok("Booking updated successfully"); 
                }

                return NotFound("Cannot find the booking"); 
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}"); 
            }
        }
        [HttpDelete("{bookingId}")]
        public async Task<ActionResult> DeleteBooking(int bookingId)
        {
            try
            {
                var result = await _bookingService.DeleteBooking(bookingId);
                if (result)
                {
                    return Ok("Booking deleted successfully"); 
                }

                return NotFound("Cannot find the booking"); 
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}"); 
            }
        }
    }
}