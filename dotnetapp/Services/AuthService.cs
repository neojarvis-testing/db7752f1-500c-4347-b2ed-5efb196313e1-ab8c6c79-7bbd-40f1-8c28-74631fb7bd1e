using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Models;
using dotnetapp.Data;
using dotnetapp.Services;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;

using System.Security.Claims;
using System.Text;

namespace dotnetapp.Services
{
    public class AuthService : IAuthService
    {
        
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext context;

        
        public AuthService(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration, ApplicationDbContext context) 
        { 
            this.userManager = userManager; 
            this.roleManager = roleManager; 
            _configuration = configuration; 
            this.context = context; 
        }

        public async Task<(int, string)> Registration(User model, string role)
        {
            // if (role != UserRoles.Admin && role != UserRoles.User)
            //     return (0, "Invalid role provided. Please use either 'Admin' or 'User'.");

            var userExists = await userManager.FindByEmailAsync(model.Email);
            if (userExists != null)
                return (0, "User already exists");

            System.Console.WriteLine("User Details "+  model);
            var user = new ApplicationUser
            {
              
                UserName = model.Username,  
                Email = model.Email,
                Name = model.Username 
            };

            var result = await userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                {
                    var errors = string.Join("; ", result.Errors.Select(e => e.Description));
                    return (0, $"User creation failed! Errors: {errors}");
                }

           
            // if (!await roleManager.RoleExistsAsync(role))
            //     await roleManager.CreateAsync(new IdentityRole(role));

            await userManager.AddToRoleAsync(user, role);
            
            context.Users.Add(model);
            await context.SaveChangesAsync();
            return (1, "User created successfully!");
        }


        public async Task<(int, string)> Login(LoginModel model)
        {
            var user = await userManager.FindByEmailAsync(model.Email);
            if (user == null)
                return (0, "Invalid email");

            if (!await userManager.CheckPasswordAsync(user, model.Password))
                return (0, "Invalid password");

            var roles = await userManager.GetRolesAsync(user);
            var dbUser = await context.Users.FirstOrDefaultAsync(u => u.Email == model.Email);
            if (dbUser == null)
                return (0, "User data missing in custom User table");
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim("UserId", dbUser.UserId.ToString())
            };

            claims.AddRange(roles.Select(r => new Claim(ClaimTypes.Role, r)));

            var token = GenerateToken(claims);

            return (1, token);
        }


        private string GenerateToken(IEnumerable<Claim> claims)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}