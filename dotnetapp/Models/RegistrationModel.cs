using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
    /// <summary>
    /// Inbound payload for POST /api/register.
    ///
    /// Registration used to bind straight onto the <see cref="User"/> entity, which meant
    /// the entity needed a Password property — and that property was then written to the
    /// Users table in cleartext. Splitting the DTO from the entity lets the password exist
    /// only for the duration of the request: it is handed to Identity to be salted and
    /// hashed into AspNetUsers, and never reaches the profile table.
    ///
    /// Property names match the previous entity exactly, so the JSON contract the Angular
    /// client posts is unchanged.
    /// </summary>
    public class RegistrationModel
    {
        [Required]
        [EmailAddress]
        [StringLength(100)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [DataType(DataType.Password)]
        [StringLength(255, MinimumLength = 8)]
        public string Password { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string Username { get; set; } = string.Empty;

        [Required]
        [Phone]
        [StringLength(15)]
        public string MobileNumber { get; set; } = string.Empty;

        [Required]
        public string UserRole { get; set; } = "User";
    }
}
