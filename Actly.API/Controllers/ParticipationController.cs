using Microsoft.AspNetCore.Mvc;
using Actly.API.Models;
using Actly.API.DTOs;
using Actly.API;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class ParticipationController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ParticipationController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Participation>>> GetParticipations()
    {
        return await _context.Participations
            .Include(p => p.User)
            .Include(p => p.Event)
            .ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<Participation>> JoinEvent([FromBody] ParticipationDto dto)
    {
        var user = await _context.Users.FindAsync(dto.UserId);
        var ev = await _context.Events.FindAsync(dto.EventId);

        if (user == null || ev == null)
            return BadRequest("Invalid user or event ID.");

        var participation = new Participation
        {
            UserId = dto.UserId,
            EventId = dto.EventId,
            Attended = dto.Attended,
            Feedback = dto.Feedback,
            JoinedAt = DateTime.UtcNow,
            User = user,
            Event = ev
        };

        _context.Participations.Add(participation);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetParticipations), new { id = participation.Id }, participation);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> LeaveEvent(int id)
    {
        var part = await _context.Participations.FindAsync(id);
        if (part == null)
            return NotFound();

        _context.Participations.Remove(part);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
