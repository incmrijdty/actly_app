using System.ComponentModel.DataAnnotations;

namespace Actly.API.Models;

public class Badge
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    public string? IconUrl { get; set; }

    public string? Criteria { get; set; }

    public List<UserBadge> UserBadges { get; set; } = new();
}