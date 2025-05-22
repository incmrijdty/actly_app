using System.ComponentModel.DataAnnotations;

namespace Actly.Core.Models;
//???
public class UserBadge
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int UserId { get; set; }

    public User User { get; set; }

    [Required]
    public int BadgeId { get; set; }

    public Badge Badge { get; set; }

    public DateTime EarnedAt { get; set; } = DateTime.UtcNow;
}
