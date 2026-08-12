using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(100)]
        public string Email { get; set; } = string.Empty;

        // Credentials live only in ASP.NET Core Identity's AspNetUsers table, which
        // stores a salted hash. This profile table must never duplicate the password.

        [Required]
        [StringLength(50)]
        public string Username { get; set; } = string.Empty;

        [Required]
        [Phone]
        [StringLength(15)]
        public string MobileNumber { get; set; } = string.Empty;

        [Required]
        public string UserRole { get; set; } = "User"; // Default role
    }
}
