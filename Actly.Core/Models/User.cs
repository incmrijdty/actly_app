using System.ComponentModel.DataAnnotations;

namespace Actly.Core.Models;

public class User
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string Username { get; set; }

    [Required, EmailAddress]
    public string Email { get; set; }

    [Required]
    public string Role { get; set; } // Volunteer or Organizer

    [Required]
    public string PasswordHash { get; set; }
    
    public List<Participation> Participations { get; set; }
    public List<UserBadge> UserBadges { get; set; } = new();
}
