using Microsoft.AspNetCore.Authorization;
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
    [HttpPost("Like/{ideaId}")]
    public IActionResult LikeIdea(int ideaId)
    {
        try
        {
            var idea = _userManager.getIdea(ideaId);
            if (idea == null)
            {
                return NotFound();
            }

            idea.Likes++;
            _userManager.updateLikeIdea(idea);
            return Ok(new { likes = idea.Likes });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}