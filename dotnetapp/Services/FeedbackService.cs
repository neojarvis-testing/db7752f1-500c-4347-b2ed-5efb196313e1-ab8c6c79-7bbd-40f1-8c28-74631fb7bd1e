using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Models;
using dotnetapp.Data;
using Microsoft.EntityFrameworkCore;
namespace dotnetapp.Services
{
    public class FeedbackService
    {
       public ApplicationDbContext _context;
       public FeedbackService(ApplicationDbContext context)
       {
           _context = context;
        }               
        public async Task<IEnumerable<Feedback>> GetAllFeedbacks()
        {
            return await _context.Feedbacks.ToListAsync();
        }
        public async Task<object> GetFeedbacksByUserId(int userId)
        {
            var userExists = await _context.Users.AnyAsync(u => u.UserId == userId);
            if (!userExists)
                {
                    return new { Message = "User not found" };
                }

            var feedbacks = await _context.Feedbacks
            .Where(f => f.UserId == userId)
            .ToListAsync();
            return feedbacks.Any() ? (object)feedbacks : new { Message = "No feedbacks found for this user" };
}

        public async Task<bool> AddFeedback(Feedback feedback)
        {
            await _context.Feedbacks.AddAsync(feedback);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<bool> DeleteFeedback(int feedbackId)
        {
            var existingfeedback=await _context.Feedbacks.FirstOrDefaultAsync(e=>e.FeedbackId==feedbackId);
            if(existingfeedback==null)
            {
                return false;
            }
            _context.Feedbacks.Remove(existingfeedback);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<UserDTO> GetUserDetailsById(int userId)
        {
                var user = await _context.Users
                    .Where(u => u.UserId == userId)
                    .Select(u => new UserDTO
                    {
                        UserId = u.UserId,
                        Username = u.Username,
                        Email = u.Email,
                        MobileNumber = u.MobileNumber,
                    })
                    .FirstOrDefaultAsync();
                return user;
        }

    }
}