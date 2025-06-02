namespace Actly.API.DTOs;

public class RegisterDto
{
    public required string Username { get; set; }
    public required string Email { get; set; }
    public required string Role { get; set; } // "Volunteer" or "Organizer"
    public required string Password { get; set; }
}

