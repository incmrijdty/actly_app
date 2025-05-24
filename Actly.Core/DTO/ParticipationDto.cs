namespace Actly.Core.DTOs;

public class ParticipationDto
{
    public int UserId { get; set; }
    public int EventId { get; set; }
    public bool Attended { get; set; }
    public string? Feedback { get; set; }
}
