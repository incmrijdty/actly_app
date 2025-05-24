//??
using Microsoft.AspNetCore.Mvc;
using Actly.Core.Models;
using Actly.API;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public UsersController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUser(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
            return NotFound();

        return user;
    }

    [HttpPost]
    public async Task<ActionResult<User>> CreateUser(User user)
    {
        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
    }

    [HttpPut("{id}")]

    public async Task<IActionResult> UpdateUser(int id, User updated)
    {
        if (id != updated.Id)
            return BadRequest();

        var user = await _context.Users.FindAsync(id);
        if (user == null)
            return NotFound();
        
        user.Username = updated.Username;
        user.Email = updated.Email;
        await _context.SaveChangesAsync();

        return NoContent();
    }
}