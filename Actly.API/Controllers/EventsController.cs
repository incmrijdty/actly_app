using Microsoft.AspNetCore.Mvc;
using Actly.Core.Models;
using Actly.API;
using Microsoft.EntityFrameworkCore;

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
            //.Include(e => e.Organizer)
            .ToListAsync();
    }

    [HttpGet("id")]
    public async Task<ActionResult<Event>> GetEvent(int id)
    {
        var ev = await _context.Events
            //.Include(e => e.Organizer)
            .FirstOrDefaultAsync(e => e.Id == id);

        if (ev == null)
            return NotFound();

        return ev;
    }

    [HttpPost]
    public async Task<ActionResult<Event>> CreateEvent(Event ev)
    {
        _context.Events.Add(ev);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetEvent), new { id = ev.Id }, ev);
    }

    //???
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateEvent(int id, Event updated)
    {
        if (id != updated.Id)
            return BadRequest();

        _context.Entry(updated).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Events.Any(e => e.Id == id))
                return NotFound();
            throw;
        }

        return NoContent();
    }

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
