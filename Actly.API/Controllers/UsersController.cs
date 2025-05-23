using Microsoft.AspNetCore.Mvc;
using Actly.Core.Models;
using Actly.API;

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
}