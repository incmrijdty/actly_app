using Microsoft.AspNetCore.Mvc;
using Actly.Core.Models;
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
    public async Task<ActionResult<Participation>> JoinEvent(Participation participation)
    {
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
