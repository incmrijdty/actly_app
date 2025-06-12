using Microsoft.AspNetCore.Mvc;
using Actly.API.Models;
using Actly.API;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Actly.API.DTO;
using System.Security.Claims;

[ApiController]
[Route("api/[controller]")]

public class EventsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public EventsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Event>>> GetEvents()
    {
        return await _context.Events
            .ToListAsync();
    }

    [HttpGet("id")]
    public async Task<ActionResult<Event>> GetEvent(int id)
    {
        var ev = await _context.Events
            .FirstOrDefaultAsync(e => e.Id == id);

        if (ev == null)
            return NotFound();

        return ev;
    }

    [Authorize(Roles = "Organizer")]
    [HttpGet("organizer/{organizerId}")]
    public async Task<IActionResult> GetByOrganizer(int organizerId) {
        var events = await _context.Events.Where(e => e.OrganizerId == organizerId).ToListAsync();
        return Ok(events);
    }


    [Authorize(Roles = "Organizer")]
    [HttpPost]

    public async Task<ActionResult<Event>> CreateEvent([FromBody] CreateEventDto dto)
    {

        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null)
            return Unauthorized();

        var ev = new Event
        {
            Title = dto.Title,
            Description = dto.Description,
            Date = dto.Date.ToUniversalTime(),
            OrganizerId = int.Parse(userIdClaim.Value),
            Location = dto.Location,
            MaxParticipants = dto.MaxParticipants,
            Category = dto.Category,
            Participations = new List<Participation>()
            
        };

        _context.Events.Add(ev);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetEvent), new { id = ev.Id }, ev);
    }

    [Authorize(Roles = "Organizer")]
    [HttpPut("{id}")]

    public async Task<IActionResult> UpdateEvent(int id, [FromBody] CreateEventDto dto)
    {
        var existing = await _context.Events.FirstOrDefaultAsync(e => e.Id == id);

        if (existing == null)
            return NotFound();

        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || existing.OrganizerId != int.Parse(userIdClaim.Value))
            return Forbid();

        existing.Title = dto.Title;
        existing.Description = dto.Description;
        existing.Location = dto.Location;
        existing.Date = dto.Date.ToUniversalTime();
        existing.MaxParticipants = dto.MaxParticipants;
        existing.Category = dto.Category;
        
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [Authorize(Roles = "Organizer")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEvent(int id)
    {
        var ev = await _context.Events.FindAsync(id);
        if (ev == null)
            return NotFound();

        _context.Events.Remove(ev);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
