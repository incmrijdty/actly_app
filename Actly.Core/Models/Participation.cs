using System.ComponentModel.DataAnnotations;

namespace Actly.Core.Models;

public class Participation
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int UserId { get; set; }

    public User User { get; set; }

    [Required]
    public int EventId { get; set; }

    public Event Event { get; set; }
    public bool Attended { get; set; }
    public string? Feedback { get; set; }

    [Required]
    public DateTime JoinedAt { get; set; } = DateTime.UtcNow;
}