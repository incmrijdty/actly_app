namespace Actly.Core.DTOs;

public class RegisterDto
{
    public string Username { get; set; }
    public string Email { get; set; }
    public string Role { get; set; } // "Volunteer" or "Organizer"
    public string Password { get; set; }
}

