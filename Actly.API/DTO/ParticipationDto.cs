namespace Actly.API.DTO
{
    public class ParticipationDto
    {
        public required int UserId { get; set; }
        public required int EventId { get; set; }
        public required bool Attended { get; set; }
        public string? Feedback { get; set; }
    }
}
