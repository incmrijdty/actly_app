using System.ComponentModel.DataAnnotations;

namespace Actly.Core.Models;

public class Event
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string Title { get; set; }

    [Required]
    public string Description { get; set; }

    [Required]
    public DateTime Date { get; set; }

    [Required]
    public string Location { get; set; }

    [Required]
    public int MaxParticipants { get; set; }

    [Required]
    public string Category { get; set; }

    public List<Participation> Participations { get; set; }
}