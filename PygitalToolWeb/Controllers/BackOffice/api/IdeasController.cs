using Microsoft.AspNetCore.Mvc;
using PhygitalTool.BL.Users;
using PhygitalTool.Domain.FlowPackage;

namespace PhygitalTool.Web.Controllers.BackOffice.api;

[ApiController]
[Route("api/[controller]")]
public class IdeasController : ControllerBase
{
    private readonly IUserManager _userManager;

    public IdeasController(IUserManager userManager)
    {
        _userManager = userManager;
    }

    // POST: api/Ideas
    [HttpPost]
    public IActionResult  PostIdea([FromBody] Idea idea)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        var domainIdea = new Idea()
        {
            Title = idea.Title,
            Description = idea.Description,
            UserId = idea.UserId
        };

      _userManager.addIdeas(domainIdea);
        return Ok();
    }
}