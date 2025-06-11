namespace Actly.API.DTO
{
    public class EventDto {
    public required int Id { get; set; }
    public required string Title { get; set; }
    public required DateTime Date { get; set; }
    public string? Description { get; set; }
    public required bool Attended { get; set; }
}

}