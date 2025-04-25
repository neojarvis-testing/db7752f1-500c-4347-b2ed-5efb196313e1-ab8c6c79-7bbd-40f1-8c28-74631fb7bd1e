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
        public async Task<IEnumerable<Feedback>> GetFeedbacksByUserId(int userId)
        {
            return await _context.Feedbacks
            .Where(f => f.UserId == userId).ToListAsync();
            
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

    }
}