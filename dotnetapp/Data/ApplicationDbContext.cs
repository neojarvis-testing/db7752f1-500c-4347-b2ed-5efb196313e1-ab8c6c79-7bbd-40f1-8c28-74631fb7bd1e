using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Models;

namespace dotnetapp.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            
        }

        public DbSet<Room> Rooms{get; set;}
        public DbSet<Booking> Bookings{get; set;}
        public DbSet<Feedback> Feedbacks{get; set;}
        public DbSet<User> Users{get; set;}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {  
        modelBuilder.Entity<Booking>()
        .HasOne(b => b.Room)
        .WithMany(r => r.Bookings)
        .HasForeignKey(b => b.RoomId)
        .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Booking>()
        .HasOne(b => b.User)
        .WithMany(u => u.Bookings)
        .HasForeignKey(b => b.UserId)
        .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Feedback>()
        .HasOne(f => f.User)
        .WithMany(u => u.Feedbacks)
        .HasForeignKey(f => f.UserId)
        .OnDelete(DeleteBehavior.Cascade);
        }
    }
}